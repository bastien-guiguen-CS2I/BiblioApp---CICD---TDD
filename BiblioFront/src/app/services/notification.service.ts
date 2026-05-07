import { Injectable, signal, computed } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    duration?: number;
    timestamp: number;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notifications = signal<Notification[]>([]);
    public notifications$ = computed(() => this.notifications());
    private idCounter = 0;

    constructor() { }

    show(message: string, type: NotificationType = 'info', duration = 3000): void {
        const notification: Notification = {
            id: `notification-${++this.idCounter}`,
            message,
            type,
            duration,
            timestamp: Date.now()
        };

        this.notifications.update(notifs => [...notifs, notification]);

        if (duration > 0) {
            setTimeout(() => this.remove(notification.id), duration);
        }
    }

    success(message: string, duration = 3000): void {
        this.show(message, 'success', duration);
    }

    error(message: string, duration = 4000): void {
        this.show(message, 'error', duration);
    }

    info(message: string, duration = 3000): void {
        this.show(message, 'info', duration);
    }

    warning(message: string, duration = 3000): void {
        this.show(message, 'warning', duration);
    }

    remove(id: string): void {
        this.notifications.update(notifs => notifs.filter(n => n.id !== id));
    }

    clear(): void {
        this.notifications.set([]);
    }
}
