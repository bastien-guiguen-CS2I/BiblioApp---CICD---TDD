import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CompteUtilisateur, Utilisateur } from '../models/models';

interface ApiCompteUtilisateur {
    id: number;
    soldeDisponible: number;
}

interface ApiBaseUtilisateur {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    adresse?: string;
    dateInscription?: string;
    type: Utilisateur['type'];
    compte?: ApiCompteUtilisateur;
}

interface ApiEnseignant extends ApiBaseUtilisateur {
    type: 'enseignant';
    nomDepartement?: string;
    grade?: string;
}

interface ApiEtudiant extends ApiBaseUtilisateur {
    type: 'etudiant';
    anneeUniversitaire?: string;
    numeroEtudiant?: string;
}

interface ApiParticulier extends ApiBaseUtilisateur {
    type: 'particulier';
    profession?: string;
}

interface ApiBibliothecaire extends ApiBaseUtilisateur {
    type: 'bibliothecaire';
    numeroEmploye?: string;
}

type ApiUtilisateur = ApiEnseignant | ApiEtudiant | ApiParticulier | ApiBibliothecaire;

@Injectable({
    providedIn: 'root'
})
export class UtilisateurService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = '/api/utilisateurs';

    getAllUtilisateurs(): Observable<Utilisateur[]> {
        return this.http.get<ApiUtilisateur[]>(this.apiUrl).pipe(
            map(users => users.map(user => this.toFrontendUser(user)))
        );
    }

    getUtilisateurById(id: string | number): Observable<Utilisateur> {
        return this.http.get<ApiUtilisateur>(`${this.apiUrl}/${this.toApiId(id)}`).pipe(
            map(user => this.toFrontendUser(user))
        );
    }

    getUtilisateurByEmail(email: string): Observable<Utilisateur> {
        return this.http.get<ApiUtilisateur>(`${this.apiUrl}/email/${encodeURIComponent(email)}`).pipe(
            map(user => this.toFrontendUser(user))
        );
    }

    login(email: string, motDePasse: string): Observable<Utilisateur> {
        return this.http.post<ApiUtilisateur>(`${this.apiUrl}/login`, { email, motDePasse }).pipe(
            map(user => this.toFrontendUser(user))
        );
    }

    createUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
        return this.http.post<ApiUtilisateur>(this.apiUrl, this.toApiPayload(utilisateur, true)).pipe(
            map(user => this.toFrontendUser(user))
        );
    }

    updateUtilisateur(id: string | number, utilisateur: Utilisateur): Observable<Utilisateur> {
        return this.http.put<ApiUtilisateur>(`${this.apiUrl}/${this.toApiId(id)}`, this.toApiPayload(utilisateur, false)).pipe(
            map(user => this.toFrontendUser(user))
        );
    }

    deleteUtilisateur(id: string | number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.toApiId(id)}`);
    }

    private toApiId(id: string | number): number {
        if (typeof id === 'number') return id;
        const normalized = id.replace(/^u/i, '');
        return Number.parseInt(normalized, 10);
    }

    private toFrontendId(id: number): string {
        return `u${id}`;
    }

    private toFrontendCompte(compte?: ApiCompteUtilisateur): CompteUtilisateur | undefined {
        if (!compte) return undefined;
        return {
            id: `c${compte.id}`,
            soldeDisponible: compte.soldeDisponible
        };
    }

    private toFrontendUser(user: ApiUtilisateur): Utilisateur {
        const base = {
            id: this.toFrontendId(user.id),
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            telephone: user.telephone,
            adresse: user.adresse,
            dateInscription: user.dateInscription,
            compte: this.toFrontendCompte(user.compte)
        };

        switch (user.type) {
            case 'enseignant':
                return { ...base, type: 'enseignant', nomDepartement: user.nomDepartement ?? '', grade: user.grade ?? '' };
            case 'etudiant':
                return { ...base, type: 'etudiant', anneeUniversitaire: user.anneeUniversitaire ?? '', numeroEtudiant: user.numeroEtudiant ?? '' };
            case 'particulier':
                return { ...base, type: 'particulier', profession: user.profession ?? '' };
            case 'bibliothecaire':
                return { ...base, type: 'bibliothecaire', numeroEmploye: user.numeroEmploye ?? '' };
        }
    }

    private toApiPayload(utilisateur: Utilisateur, isCreate: boolean): Record<string, unknown> {
        const payload: Record<string, unknown> = {
            type: utilisateur.type,
            nom: utilisateur.nom,
            prenom: utilisateur.prenom,
            email: utilisateur.email,
            telephone: utilisateur.telephone,
            adresse: utilisateur.adresse,
            dateInscription: utilisateur.dateInscription,
            motDePasse: isCreate ? ('motDePasse' in utilisateur ? (utilisateur as Utilisateur & { motDePasse?: string }).motDePasse ?? 'password123' : 'password123') : '',
            compte: utilisateur.compte
                ? {
                    ...(utilisateur.compte.id ? { id: this.toApiId(utilisateur.compte.id) } : {}),
                    soldeDisponible: utilisateur.compte.soldeDisponible
                }
                : { soldeDisponible: 0 }
        };

        if (utilisateur.type === 'enseignant') {
            payload['nomDepartement'] = utilisateur.nomDepartement;
            payload['grade'] = utilisateur.grade;
        } else if (utilisateur.type === 'etudiant') {
            payload['anneeUniversitaire'] = utilisateur.anneeUniversitaire;
            payload['numeroEtudiant'] = utilisateur.numeroEtudiant;
        } else if (utilisateur.type === 'particulier') {
            payload['profession'] = utilisateur.profession;
        } else if (utilisateur.type === 'bibliothecaire') {
            payload['numeroEmploye'] = utilisateur.numeroEmploye;
        }

        return payload;
    }
}