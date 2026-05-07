import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { DialogService } from '../services/dialog.service';
import { Utilisateur } from '../models/models';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
    templateUrl: './layout.component.html'
})
export class LayoutComponent {
    isMobileMenuOpen = signal(false);
    currentUser = computed(() => this.authService.currentUser());
    isAdmin = computed(() => this.authService.isAdmin());

    constructor(
        private router: Router,
        private authService: AuthService,
        private notificationService: NotificationService,
        private dialogService: DialogService
    ) { }

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

