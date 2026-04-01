import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ressource {
    id?: number;
    titre: string;
    type: string;
    emplacementId: number;
    auteur?: string;
    codeISBN?: string;
    numeroVolume?: number;
    dateParution?: string;
}

@Injectable({
    providedIn: 'root'
})
export class RessourceService {
    private readonly apiUrl = '/api/ressources';

    constructor(private http: HttpClient) { }

    getAllRessources(): Observable<Ressource[]> {
        return this.http.get<Ressource[]>(this.apiUrl);
    }

    getRessourceById(id: number): Observable<Ressource> {
        return this.http.get<Ressource>(`${this.apiUrl}/${id}`);
    }

    createRessource(ressource: Ressource): Observable<Ressource> {
        return this.http.post<Ressource>(this.apiUrl, ressource);
    }

    updateRessource(id: number, ressource: Ressource): Observable<Ressource> {
        return this.http.put<Ressource>(`${this.apiUrl}/${id}`, ressource);
    }

    deleteRessource(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
