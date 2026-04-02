import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { mockUtilisateurs } from './mock-data';
import { Utilisateur } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    currentUser = signal<Utilisateur | null>(null);
    isAuthenticated = signal(false);
    isAdmin = signal(false);

    constructor(private router: Router) {
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
        this.isAdmin.set(user.email === 'admin@biblioapp.fr');
    }

    login(email: string): Observable<Utilisateur> {
        if (!email || !email.trim()) {
            return throwError(() => new Error('Email requis'));
        }

        const user = mockUtilisateurs.find(u => u.email === email);
        if (!user) {
            return throwError(() => new Error('Utilisateur non trouvé'));
        }

        return of(user).pipe(
            delay(500),
            // Since we're using mock data, we can set the user directly after the observable completes
        );
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
