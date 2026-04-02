import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { mockRessources, mockExemplaires } from '../../services/mock-data';
import { Ressource, Exemplaire, Livre } from '../../models/models';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-detail-livre',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './detail-livre.component.html'
})
export class DetailLivreComponent implements OnInit {
    ressource = signal<Ressource | null>(null);
    exemplaires = signal<Exemplaire[]>([]);
    isLoading = signal(true);
    isBorrowing = signal(false);

    dispoCount = (): number => {
        return this.exemplaires().filter(e => e.disponible).length;
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.loadRessource(id);
            }
        });
    }

    getIsbnOrNA(): string {
        if (!this.ressource()) return 'N/A';
        if (this.ressource()!.type === 'livre') {
            const livre = this.ressource() as Livre;
            return livre.isbn || 'N/A';
        }
        return 'N/A';
    }

    getAuthorOrVolume(): string {
        if (!this.ressource()) return '';
        if (this.ressource()!.type === 'livre') {
            const livre = this.ressource() as Livre;
            return livre.auteur;
        }
        const revue = this.ressource() as { numeroVolume: number };
        return `Volume ${revue.numeroVolume}`;
    }

    loadRessource(id: string): void {
        this.isLoading.set(true);
        setTimeout(() => {
            const res = mockRessources.find(r => r.id === id);
            if (res) {
                this.ressource.set(res);
                this.exemplaires.set(
                    mockExemplaires.filter(ex => ex.ressourceId === id)
                );
            }
            this.isLoading.set(false);
        }, 300);
    }

    goBack(): void {
        this.router.navigate(['/catalogue']);
    }

    handleBorrow(): void {
        if (!this.dispoCount()) {
            this.notificationService.warning('Aucun exemplaire disponible');
            return;
        }
        this.isBorrowing.set(true);
        setTimeout(() => {
            this.notificationService.success('Emprunt effectué avec succès');
            this.isBorrowing.set(false);
        }, 500);
    }
}
