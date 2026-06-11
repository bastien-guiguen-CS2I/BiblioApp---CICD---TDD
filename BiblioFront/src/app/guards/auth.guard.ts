import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (): boolean => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isUserAuthenticated()) {
        return true;
    }
    router.navigate(['/catalogue']);
    return false;
};

export const adminGuard: CanActivateFn = (): boolean => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isUserAdmin()) {
        return true;
    }
    router.navigate(['/catalogue']);
    return false;
};