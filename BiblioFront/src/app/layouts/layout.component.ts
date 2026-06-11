import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { DialogService } from '../services/dialog.service';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
    templateUrl: './layout.component.html'
})
export class LayoutComponent {
    private readonly authService = inject(AuthService);
    private readonly notificationService = inject(NotificationService);
    private readonly dialogService = inject(DialogService);

    isMobileMenuOpen = signal(false);
    currentUser = computed(() => this.authService.currentUser());
    isAdmin = computed(() => this.authService.isAdmin());

    toggleMobileMenu(): void {
        this.isMobileMenuOpen.update(v => !v);
    }

    closeMobileMenu(): void {
        this.isMobileMenuOpen.set(false);
    }

    openLoginDialog(): void {
        this.dialogService.openLoginDialog();
    }

    handleLogout(): void {
        this.authService.logout();
        this.notificationService.info('Vous avez été déconnecté');
    }

    getCurrentUserName(): string {
        const user = this.currentUser();
        if (!user) return '';
        return `${user.prenom} ${user.nom}`;
    }

    getCurrentDate(): Date {
        return new Date();
    }
}