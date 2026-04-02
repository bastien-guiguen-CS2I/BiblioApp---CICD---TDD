import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { mockRessources } from './mock-data';
import { Ressource } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class RessourceService {

    constructor() { }

    getAllRessources(): Observable<Ressource[]> {
        return of([...mockRessources]).pipe(delay(300));
    }

    getRessourceById(id: string): Observable<Ressource> {
        const ressource = mockRessources.find(r => r.id === id);
        if (!ressource) {
            return throwError(() => new Error(`Ressource avec l'id ${id} non trouvée`));
        }
        return of(ressource).pipe(delay(200));
    }

    createRessource(ressource: Ressource): Observable<Ressource> {
        const newRessource: Ressource = {
            ...ressource,
            id: `r${Date.now()}`
        };
        return of(newRessource).pipe(delay(300));
    }

    updateRessource(id: string, ressource: Ressource): Observable<Ressource> {
        const existingIndex = mockRessources.findIndex(r => r.id === id);
        if (existingIndex === -1) {
            return throwError(() => new Error(`Ressource avec l'id ${id} non trouvée`));
        }
        const updated = { ...ressource, id };
        return of(updated).pipe(delay(300));
    }

    deleteRessource(id: string): Observable<void> {
        const exists = mockRessources.some(r => r.id === id);
        if (!exists) {
            return throwError(() => new Error(`Ressource avec l'id ${id} non trouvée`));
        }
        return of(void 0).pipe(delay(300));
    }
}
