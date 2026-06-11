import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notifications.component.html'
})
export class NotificationsComponent {
    protected readonly notificationService = inject(NotificationService);
    notifications = computed(() => this.notificationService.notifications$());
}