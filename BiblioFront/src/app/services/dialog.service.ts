import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    loginDialogOpen = signal(false);

    openLoginDialog(): void {
        this.loginDialogOpen.set(true);
    }

    closeLoginDialog(): void {
        this.loginDialogOpen.set(false);
    }
}
