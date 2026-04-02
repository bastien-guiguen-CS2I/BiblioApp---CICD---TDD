import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { mockRessources, mockExemplaires } from '../../services/mock-data';
import { Ressource, Livre, Revue } from '../../models/models';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-gestion-catalogue',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './gestion-catalogue.component.html'
})
export class GestionCatalogueComponent implements OnInit {
    ressources = signal<Ressource[]>([]);
    search = '';
    isLoading = signal(true);

    constructor(
        private confirmDialogService: ConfirmDialogService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.fetchRessources();
    }

    getAuthorOrVolume(resource: Ressource): string {
        if (resource.type === 'livre') {
            const livre = resource as Livre;
            return livre.auteur;
        }
        const revue = resource as Revue;
        return `Vol. ${revue.numeroVolume}`;
    }

    filteredRessources = (): Ressource[] => {
        return this.ressources().filter(r =>
            r.titre.toLowerCase().includes(this.search.toLowerCase())
        );
    };

    getExempCount(ressourceId: string): number {
        return mockExemplaires.filter(ex => ex.ressourceId === ressourceId).length;
    }

    fetchRessources(): void {
        this.isLoading.set(true);
        setTimeout(() => {
            this.ressources.set(mockRessources);
            this.isLoading.set(false);
        }, 300);
    }

    handleDelete(id: string): void {
        this.confirmDialogService.open({
            title: 'Supprimer la ressource',
            message: 'Êtes-vous sûr de vouloir supprimer cette ressource?',
            confirmText: 'Supprimer',
            cancelText: 'Annuler',
            isDestructive: true
        }).subscribe(result => {
            if (result) {
                this.ressources.update(res =>
                    res.filter(r => r.id !== id)
                );
                this.notificationService.success('Ressource supprimée avec succès');
            }
        });
    }
}
