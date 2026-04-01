import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RessourceService, Ressource } from '../services/ressource.service';

@Component({
    selector: 'app-ressource-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ressource-list.component.html',
    styleUrls: ['./ressource-list.component.scss']
})
export class RessourceListComponent implements OnInit {
    ressources: Ressource[] = [];
    loading: boolean = true;
    error: string | null = null;

    constructor(
        private ressourceService: RessourceService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        console.log('🔵 ngOnInit appelé');
        this.ressourceService.getAllRessources().subscribe({
            next: (data) => {
                console.log('Données reçues:', data);
                this.ressources = data;
                this.loading = false;
                this.cdr.markForCheck();
            },
            error: (error) => {
                console.error('Erreur:', error);
                this.error = 'Erreur lors du chargement des ressources';
                this.loading = false;
                this.cdr.markForCheck();
            }
        });
    }

    getTypeBadgeClass(type: string): string {
        return type === 'LIVRE' ? 'bg-primary' : 'bg-info';
    }

    getTypeLabel(type: string): string {
        return type === 'LIVRE' ? 'Livre' : 'Revue';
    }
}
