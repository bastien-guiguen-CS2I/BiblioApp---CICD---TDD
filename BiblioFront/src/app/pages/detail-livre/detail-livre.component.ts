import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly ressourceService = inject(RessourceService);
    private readonly notificationService = inject(NotificationService);

    ressource = signal<Ressource | null>(null);
    exemplaires = signal<Exemplaire[]>([]);
    isLoading = signal(true);
    isBorrowing = signal(false);

    dispoCount = (): number => {
        return this.exemplaires().filter(e => e.disponible).length;
    };

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.loadRessource(id);
            }
        });
    }

    getIsbnOrNA(): string {
        const res = this.ressource();
        if (!res) return 'N/A';
        if (this.isLivre(res)) {
            return (res as Livre).codeISBN || 'N/A';
        }
        return 'N/A';
    }

    getAuthorOrVolume(): string {
        const res = this.ressource();
        if (!res) return '';
        if (this.isLivre(res)) {
            return (res as Livre).auteur;
        }
        return `Volume ${(res as { numeroVolume: number }).numeroVolume}`;
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
            error: (err: Error) => {
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