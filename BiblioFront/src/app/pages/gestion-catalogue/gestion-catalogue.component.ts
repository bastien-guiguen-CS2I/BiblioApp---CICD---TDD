import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { mockExemplaires } from '../../services/mock-data';
import { Ressource, Livre, Revue } from '../../models/models';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { NotificationService } from '../../services/notification.service';
import { RessourceService } from '../../services/ressource.service';

@Component({
    selector: 'app-gestion-catalogue',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './gestion-catalogue.component.html'
})
export class GestionCatalogueComponent implements OnInit {
    private readonly ressourceService = inject(RessourceService);
    private readonly confirmDialogService = inject(ConfirmDialogService);
    private readonly notificationService = inject(NotificationService);

    ressources = signal<Ressource[]>([]);
    search = '';
    isLoading = signal(true);

    ngOnInit(): void {
        this.fetchRessources();
    }

    getAuthorOrVolume(resource: Ressource): string {
        if (resource.type === 'livre') {
            return (resource as Livre).auteur;
        }
        return `Vol. ${(resource as Revue).numeroVolume}`;
    }

    filteredRessources = (): Ressource[] => {
        return this.ressources().filter(r =>
            r.titre.toLowerCase().includes(this.search.toLowerCase())
        );
    };

    getExempCount(ressourceId: string | number): number {
        return mockExemplaires.filter(ex => ex.ressourceId === ressourceId).length;
    }

    fetchRessources(): void {
        this.isLoading.set(true);
        this.ressourceService.getAllRessources().subscribe({
            next: (ressources) => {
                this.ressources.set(ressources);
                this.isLoading.set(false);
            },
            error: (err: Error) => {
                console.error('Erreur lors du chargement des ressources', err);
                this.isLoading.set(false);
            }
        });
    }

    handleDelete(id: string | number): void {
        this.confirmDialogService.open({
            title: 'Supprimer la ressource',
            message: 'Êtes-vous sûr de vouloir supprimer cette ressource?',
            confirmText: 'Supprimer',
            cancelText: 'Annuler',
            isDestructive: true
        }).subscribe(result => {
            if (result) {
                this.ressourceService.deleteRessource(id).subscribe({
                    next: () => {
                        this.ressources.update(res => res.filter(r => r.id !== id));
                        this.notificationService.success('Ressource supprimée avec succès');
                    },
                    error: (err: Error) => {
                        console.error('Erreur lors de la suppression', err);
                        this.notificationService.error('Erreur lors de la suppression de la ressource');
                    }
                });
            }
        });
    }
}