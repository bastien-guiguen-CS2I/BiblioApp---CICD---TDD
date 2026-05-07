import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { mockEmprunts, mockUtilisateurs, mockExemplaires, mockRessources } from '../../services/mock-data';
import { Emprunt } from '../../models/models';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-gestion-emprunts',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './gestion-emprunts.component.html'
})
export class GestionEmpruntsComponent implements OnInit {
    emprunts = signal<Emprunt[]>([]);
    search = '';
    activeTab = signal<'tous' | 'retards'>('tous');
    isLoading = signal(true);
    isSending = signal(false);

    constructor(private notificationService: NotificationService) { }

    ngOnInit(): void {
        this.fetchEmprunts();
    }

    filteredEmprunts = (): Emprunt[] => {
        let filtered = this.emprunts();

        if (this.activeTab() === 'retards') {
            filtered = filtered.filter(e => !e.dateRetourEffective && e.enRetard);
        }

        const searchLower = this.search.toLowerCase();
        return filtered.filter(e => {
            const user = this.getUtilisateur(e.utilisateurId);
            const resource = this.getRessource(e.exemplaireId);
            return (
                (user?.nom.toLowerCase().includes(searchLower)) ||
                (user?.prenom.toLowerCase().includes(searchLower)) ||
                (resource?.titre.toLowerCase().includes(searchLower))
            );
        });
    };

    overdueIds = (): string[] => {
        return this.emprunts()
            .filter(e => !e.dateRetourEffective && e.enRetard)
            .map(e => e.id);
    };

    getOverdueCount(): number {
        return this.emprunts().filter(e => !e.dateRetourEffective && e.enRetard).length;
    }

    getUtilisateur(userId: string) {
        return mockUtilisateurs.find(u => u.id === userId);
    }

    getRessource(exemplaireId: string) {
        const exemplaire = mockExemplaires.find(ex => ex.id === exemplaireId);
        if (!exemplaire) return undefined;
        return mockRessources.find(r => r.id === exemplaire.ressourceId);
    }

    setActiveTab(tab: 'tous' | 'retards'): void {
        this.activeTab.set(tab);
    }

    fetchEmprunts(): void {
        this.isLoading.set(true);
        setTimeout(() => {
            this.emprunts.set(mockEmprunts);
            this.isLoading.set(false);
        }, 300);
    }

    handleRetour(id: string): void {
        const emprunt = this.emprunts().find(e => e.id === id);
        if (emprunt) {
            this.emprunts.update(emprunts =>
                emprunts.map(e =>
                    e.id === id ? { ...e, dateRetourEffective: new Date().toISOString().split('T')[0] } : e
                )
            );
            this.notificationService.success('Ressource marquée comme retournée');
        }
    }

    handleRelance(): void {
        const count = this.overdueIds().length;
        if (count === 0) {
            this.notificationService.info('Aucun emprunt en retard');
            return;
        }
        this.isSending.set(true);
        setTimeout(() => {
            this.notificationService.success(`${count} relance(s) envoyée(s) avec succès`);
            this.isSending.set(false);
        }, 500);
    }
}
