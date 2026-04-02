import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationsComponent, ConfirmDialogComponent, LoginDialogComponent],
  template: `
    <router-outlet></router-outlet>
    <app-notifications></app-notifications>
    <app-confirm-dialog></app-confirm-dialog>
    <app-login-dialog></app-login-dialog>
  `,
  styles: []
})
export class App { }


