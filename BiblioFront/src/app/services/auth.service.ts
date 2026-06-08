import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    currentUser = signal<Utilisateur | null>(null);
    isAuthenticated = signal(false);
    isAdmin = signal(false);

    constructor(
        private router: Router,
        private utilisateurService: UtilisateurService
    ) {
        this.loadUserFromStorage();
    }

    private loadUserFromStorage(): void {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser) as Utilisateur;
                this.currentUser.set(user);
                this.isAuthenticated.set(true);
                this.updateAdminStatus(user);
            } catch {
                this.logout();
            }
        }
    }

    private updateAdminStatus(user: Utilisateur): void {
        this.isAdmin.set(user.type === 'bibliothecaire');
    }

    login(email: string, motDePasse: string): Observable<Utilisateur> {
        if (!email || !email.trim()) {
            return throwError(() => new Error('Email requis'));
        }

        if (!motDePasse || !motDePasse.trim()) {
            return throwError(() => new Error('Mot de passe requis'));
        }

        return this.utilisateurService.login(email, motDePasse);
    }

    setCurrentUser(user: Utilisateur): void {
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
        this.updateAdminStatus(user);
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    logout(): void {
        this.currentUser.set(null);
        this.isAuthenticated.set(false);
        this.isAdmin.set(false);
        sessionStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    isUserAuthenticated(): boolean {
        return this.isAuthenticated();
    }

    isUserAdmin(): boolean {
        return this.isAdmin();
    }

    getCurrentUser(): Utilisateur | null {
        return this.currentUser();
    }
}
