import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { mockEmprunts, mockUtilisateurs, mockExemplaires, mockRessources } from '../../services/mock-data';
import { Emprunt, Ressource } from '../../models/models';

@Component({
    selector: 'app-mes-emprunts',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mes-emprunts.component.html'
})
export class MesEmpruntsComponent implements OnInit {
    emprunts = signal<Emprunt[]>([]);

    ngOnInit(): void {
        this.emprunts.set(mockEmprunts);
    }

    activeEmprunts = (): Emprunt[] => {
        return this.emprunts().filter(e => !e.dateRetourEffective && !e.enRetard);
    };

    overdueEmprunts = (): Emprunt[] => {
        return this.emprunts().filter(e => !e.dateRetourEffective && e.enRetard);
    };

    returnedEmprunts = (): Emprunt[] => {
        return this.emprunts().filter(e => e.dateRetourEffective);
    };

    getRessource(exemplaireId: string) {
        const exemplaire = mockExemplaires.find(ex => ex.id === exemplaireId);
        if (!exemplaire) return undefined;
        return mockRessources.find(r => r.id === exemplaire.ressourceId);
    }

    getAuthorOrVolume(resource: Ressource | undefined): string {
        if (!resource) return '';
        if (resource.type === 'livre') {
            return resource.auteur;
        }
        return 'Vol. ' + resource.numeroVolume;
    }
}
