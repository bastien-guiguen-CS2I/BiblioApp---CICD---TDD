import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { mockRessources, mockExemplaires } from '../../services/mock-data';
import { Ressource, Livre, Revue } from '../../models/models';
import { NotificationService } from '../../services/notification.service';

interface AddResourceForm {
    type: 'livre' | 'revue';
    titre: string;
    auteur: string;
    volume: string;
    isbn: string;
    datePublication: string;
    caution: number;
    localisation: string;
    nombreExemplaires: number;
}

@Component({
    selector: 'app-ajouter-livre',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './ajouter-livre.component.html'
})
export class AjouterLivreComponent {
    form = signal<AddResourceForm>({
        type: 'livre',
        titre: '',
        auteur: '',
        volume: '',
        isbn: '',
        datePublication: '',
        caution: 0,
        localisation: '',
        nombreExemplaires: 1
    });

    isSubmitting = signal(false);

    constructor(
        private router: Router,
        private notificationService: NotificationService
    ) { }

    onTypeChange(newType: 'livre' | 'revue'): void {
        this.form.update(f => ({
            ...f,
            type: newType,
            auteur: '',
            volume: '',
            isbn: ''
        }));
    }

    private validateForm(): string | null {
        const formValue = this.form();

        if (!formValue.titre.trim()) {
            return 'Le titre est requis';
        }

        if (formValue.type === 'livre' && !formValue.auteur.trim()) {
            return "L'auteur est requis pour un livre";
        }

        if (formValue.type === 'revue' && !formValue.volume.trim()) {
            return 'Le numéro de volume est requis pour une revue';
        }

        if (formValue.caution <= 0) {
            return 'La caution doit être supérieure à 0';
        }

        if (formValue.nombreExemplaires < 1) {
            return 'Au moins 1 exemplaire est requis';
        }

        return null;
    }

    handleSubmit(): void {
        const validationError = this.validateForm();
        if (validationError) {
            this.notificationService.error(validationError);
            return;
        }

        this.isSubmitting.set(true);
        const formValue = this.form();

        setTimeout(() => {
            const newId = `R${Math.random().toString(36).substring(2, 11)}`;

            const newRessource: Ressource = formValue.type === 'livre'
                ? {
                    id: newId,
                    type: 'livre',
                    titre: formValue.titre,
                    auteur: formValue.auteur,
                    isbn: formValue.isbn,
                    caution: formValue.caution,
                    localisation: formValue.localisation,
                    datePublication: formValue.datePublication
                } as Livre
                : {
                    id: newId,
                    type: 'revue',
                    titre: formValue.titre,
                    numeroVolume: parseInt(formValue.volume, 10) || 1,
                    caution: formValue.caution,
                    localisation: formValue.localisation,
                    datePublication: formValue.datePublication
                } as Revue;

            mockRessources.push(newRessource);

            // Create exemplaires
            for (let i = 0; i < formValue.nombreExemplaires; i++) {
                mockExemplaires.push({
                    id: `EX${Math.random().toString(36).substring(2, 11)}`,
                    ressourceId: newId,
                    barcode: `BAR${Date.now()}${i}`,
                    disponible: true
                });
            }

            this.isSubmitting.set(false);
            this.notificationService.success('Ressource ajoutée avec succès');
            this.router.navigate(['/gestion/catalogue']);
        }, 500);
    }

    handleCancel(): void {
        this.router.navigate(['/gestion/catalogue']);
    }
}
