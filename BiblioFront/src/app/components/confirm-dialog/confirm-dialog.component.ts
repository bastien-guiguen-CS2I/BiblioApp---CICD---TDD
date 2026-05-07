import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
    isOpen = computed(() => this.dialogService.isOpen$());
    options = computed(() => this.dialogService.options$());

    constructor(public dialogService: ConfirmDialogService) { }
}
