import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { DialogService } from '../../services/dialog.service';

@Component({
    selector: 'app-login-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login-dialog.component.html'
})
export class LoginDialogComponent {
    protected readonly dialogService = inject(DialogService);
    private readonly authService = inject(AuthService);
    private readonly notificationService = inject(NotificationService);

    email = '';
    password = 'password123';
    isLoading = signal(false);

    handleClose(): void {
        this.dialogService.closeLoginDialog();
    }

    handleSubmit(): void {
        if (!this.email.trim()) {
            this.notificationService.error('Veuillez saisir votre email');
            return;
        }
        this.isLoading.set(true);
        this.authService.login(this.email, this.password).subscribe({
            next: (user) => {
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