import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ressource } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class RessourceService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = '/api/ressources';

    getAllRessources(): Observable<Ressource[]> {
        return this.http.get<Ressource[]>(this.apiUrl);
    }

    getRessourceById(id: number | string): Observable<Ressource> {
        return this.http.get<Ressource>(`${this.apiUrl}/${id}`);
    }

    createRessource(ressource: Ressource): Observable<Ressource> {
        return this.http.post<Ressource>(this.apiUrl, ressource);
    }

    updateRessource(id: number | string, ressource: Ressource): Observable<Ressource> {
        return this.http.put<Ressource>(`${this.apiUrl}/${id}`, ressource);
    }

    deleteRessource(id: number | string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}