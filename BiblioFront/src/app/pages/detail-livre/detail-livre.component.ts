import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { mockExemplaires } from '../../services/mock-data';
import { Ressource, Exemplaire, Livre } from '../../models/models';
import { NotificationService } from '../../services/notification.service';
import { RessourceService } from '../../services/ressource.service';

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
        private ressourceService: RessourceService,
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
        const res = this.ressource()!;
        if (this.isLivre(res)) {
            // Access directly via indexing to avoid type issues
            const codeISBN = (res as any)['codeISBN'];
            return codeISBN || 'N/A';
        }
        return 'N/A';
    }

    getAuthorOrVolume(): string {
        if (!this.ressource()) return '';
        const res = this.ressource()!;
        if (this.isLivre(res)) {
            const livre = this.ressource() as Livre;
            return livre.auteur;
        }
        const revue = this.ressource() as { numeroVolume: number };
        return `Volume ${revue.numeroVolume}`;
    }

    isLivre(ressource: Ressource): boolean {
        return ressource.type.toLowerCase() === 'livre';
    }

    loadRessource(id: string | number): void {
        this.isLoading.set(true);
        this.ressourceService.getRessourceById(id).subscribe({
            next: (res) => {
                this.ressource.set(res);
                this.exemplaires.set(
                    mockExemplaires.filter(ex => ex.ressourceId === id)
                );
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Erreur lors du chargement de la ressource', err);
                this.isLoading.set(false);
            }
        });
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
