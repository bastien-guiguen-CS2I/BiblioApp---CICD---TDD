import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ConfirmDialogOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {
    private isOpen = signal(false);
    private options = signal<ConfirmDialogOptions | null>(null);
    private confirmSubject = new Subject<boolean>();

    isOpen$ = this.isOpen;
    options$ = this.options;

    open(opts: ConfirmDialogOptions): Observable<boolean> {
        this.options.set(opts);
        this.isOpen.set(true);
        return this.confirmSubject.asObservable();
    }

    confirm(): void {
        this.close();
        this.confirmSubject.next(true);
    }

    cancel(): void {
        this.close();
        this.confirmSubject.next(false);
    }

    private close(): void {
        this.isOpen.set(false);
        this.options.set(null);
    }
}
