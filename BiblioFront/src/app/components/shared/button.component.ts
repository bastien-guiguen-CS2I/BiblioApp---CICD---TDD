import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './button.component.html'
})
export class ButtonComponent {
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Input() disabled = false;
    @Input() isLoading = false;
    @Input() ariaLabel = '';
    @Output() onClick = new EventEmitter<void>();

    getButtonClasses(): string {
        const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

        const sizeClasses: Record<string, string> = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base'
        };

        const variantClasses: Record<string, string> = {
            primary: 'bg-primary text-white hover:bg-blue-700 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed',
            secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed',
            danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed',
            success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed'
        };

        return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant]}`;
    }
}
