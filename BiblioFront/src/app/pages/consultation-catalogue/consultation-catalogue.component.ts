import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Ressource, Livre } from '../../models/models';
import { RessourceService } from '../../services/ressource.service';

@Component({
    selector: 'app-consultation-catalogue',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './consultation-catalogue.component.html'
})
export class ConsultationCatalogueComponent implements OnInit {
    ressources = signal<Ressource[]>([]);
    search = '';
    auteur = '';
    annee = '';
    categorie = '';
    isAdvanced = signal(false);
    isLoading = signal(false);

    constructor(private ressourceService: RessourceService) { }

    ngOnInit(): void {
        this.fetchRessources();
    }

    getAuthorOrVolume(resource: Ressource): string {
        if (resource.type === 'livre') {
            const livre = resource as Livre;
            return livre.auteur;
        }
        return `Vol. ${(resource as { numeroVolume: number }).numeroVolume}`;
    }

    filteredRessources = (): Ressource[] => {
        return this.ressources().filter(r => {
            const matchesTitle = r.titre.toLowerCase().includes(this.search.toLowerCase());
            if (!this.isAdvanced()) return matchesTitle;

            if (this.auteur === '') return matchesTitle;
            if (r.type === 'livre') {
                const livre = r as Livre;
                return matchesTitle && livre.auteur.toLowerCase().includes(this.auteur.toLowerCase());
            }
            return matchesTitle;
        });
    };

    toggleAdvanced(): void {
        this.isAdvanced.update(v => !v);
    }

    handleSearch(): void {
        this.fetchRessources();
    }

    fetchRessources(): void {
        this.isLoading.set(true);
        this.ressourceService.getAllRessources().subscribe({
            next: (ressources) => {
                this.ressources.set(ressources);
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Erreur lors du chargement des ressources', err);
                this.isLoading.set(false);
            }
        });
    }
}
