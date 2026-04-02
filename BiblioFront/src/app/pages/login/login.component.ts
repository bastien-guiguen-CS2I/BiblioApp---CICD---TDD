import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { mockUtilisateurs } from '../../services/mock-data';
import { Utilisateur } from '../../models/models';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    email = '';
    password = 'password123';
    isLoading = signal(false);
    mockUsers = mockUtilisateurs;

    constructor(
        private router: Router,
        private authService: AuthService,
        private notificationService: NotificationService
    ) { }

    selectMockUser(user: Utilisateur): void {
        this.email = user.email;
    }

    handleClose(): void {
        this.router.navigate(['/catalogue']);
    }

    handleSubmit(): void {
        if (!this.email.trim()) {
            this.notificationService.error('Veuillez saisir votre email');
            return;
        }

        this.isLoading.set(true);

        this.authService.login(this.email).subscribe({
            next: (user: Utilisateur) => {
                this.authService.setCurrentUser(user);
                this.isLoading.set(false);
                this.notificationService.success('Connexion réussie');
                const targetRoute = this.authService.isUserAdmin() ? '/gestion/catalogue' : '/catalogue';
                this.router.navigate([targetRoute]);
            },
            error: (error: Error) => {
                this.isLoading.set(false);
                this.notificationService.error(error.message || 'Erreur de connexion');
            }
        });
    }
}
