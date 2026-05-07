import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, NotificationType } from '../../services/notification.service';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notifications.component.html'
})
export class NotificationsComponent {
    notifications = computed(() => this.notificationService.notifications$());

    constructor(public notificationService: NotificationService) { }
}
