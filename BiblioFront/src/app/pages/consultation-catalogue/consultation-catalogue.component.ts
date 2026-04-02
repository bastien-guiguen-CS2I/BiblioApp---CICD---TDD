import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { mockRessources } from '../../services/mock-data';
import { Ressource, Livre } from '../../models/models';

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
        setTimeout(() => {
            this.ressources.set(mockRessources);
            this.isLoading.set(false);
        }, 300);
    }
}
