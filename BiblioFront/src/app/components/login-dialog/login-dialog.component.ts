import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { DialogService } from '../../services/dialog.service';
import { mockUtilisateurs } from '../../services/mock-data';
import { Utilisateur } from '../../models/models';

@Component({
    selector: 'app-login-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login-dialog.component.html'
})
export class LoginDialogComponent {
    email = '';
    password = 'password123';
    isLoading = signal(false);
    mockUsers = mockUtilisateurs;

    constructor(
        public dialogService: DialogService,
        private authService: AuthService,
        private notificationService: NotificationService
    ) { }

    selectMockUser(user: Utilisateur): void {
        this.email = user.email;
    }

    handleClose(): void {
        this.dialogService.closeLoginDialog();
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
                this.dialogService.closeLoginDialog();
            },
            error: (error: Error) => {
                this.isLoading.set(false);
                this.notificationService.error(error.message || 'Erreur de connexion');
            }
        });
    }
}
