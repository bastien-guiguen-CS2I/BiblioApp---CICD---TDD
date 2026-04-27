import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Ressource } from '../models/models';
import { mockRessources } from './mock-data';

@Injectable({
    providedIn: 'root'
})
export class RessourceService {
    private readonly apiUrl = '/api/ressources';
    private ressources = [...mockRessources];

    constructor(private http: HttpClient) { }

    getAllRessources(): Observable<Ressource[]> {
        return of(this.ressources);
    }

    getRessourceById(id: number | string): Observable<Ressource> {
        const ressource = this.ressources.find(r => r.id === id);
        return of(ressource as Ressource);
    }

    createRessource(ressource: Ressource): Observable<Ressource> {
        ressource.id = 'r' + (Math.random() * 10000).toFixed(0);
        this.ressources.push(ressource);
        return of(ressource);
    }

    updateRessource(id: number | string, ressource: Ressource): Observable<Ressource> {
        const index = this.ressources.findIndex(r => r.id === id);
        if (index !== -1) {
            this.ressources[index] = { ...ressource, id: id as string };
        }
        return of(ressource);
    }

    deleteRessource(id: number | string): Observable<void> {
        this.ressources = this.ressources.filter(r => r.id !== id);
        return of(void 0);
    }
}
