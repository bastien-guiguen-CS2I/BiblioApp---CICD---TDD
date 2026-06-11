import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { mockExemplaires } from '../../services/mock-data';
import { Ressource, Livre, Revue } from '../../models/models';
import { NotificationService } from '../../services/notification.service';
import { RessourceService } from '../../services/ressource.service';

interface AddResourceForm {
    type: 'livre' | 'revue';
    titre: string;
    auteur: string;
    volume: string;
    codeISBN: string;
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
    private readonly router = inject(Router);
    private readonly ressourceService = inject(RessourceService);
    private readonly notificationService = inject(NotificationService);

    form = signal<AddResourceForm>({
        type: 'livre',
        titre: '',
        auteur: '',
        volume: '',
        codeISBN: '',
        datePublication: '',
        caution: 0,
        localisation: '',
        nombreExemplaires: 1
    });

    isSubmitting = signal(false);

    onTypeChange(newType: 'livre' | 'revue'): void {
        this.form.update(f => ({
            ...f,
            type: newType,
            auteur: '',
            volume: '',
            codeISBN: ''
        }));
    }

    private validateForm(): string | null {
        const formValue = this.form();
        if (!formValue.titre.trim()) return 'Le titre est requis';
        if (formValue.type === 'livre' && !formValue.auteur.trim()) return "L'auteur est requis pour un livre";
        if (formValue.type === 'revue' && !formValue.volume.trim()) return 'Le numéro de volume est requis pour une revue';
        if (formValue.caution <= 0) return 'La caution doit être supérieure à 0';
        if (formValue.nombreExemplaires < 1) return 'Au moins 1 exemplaire est requis';
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

        const newRessource: Omit<Livre, 'id'> | Omit<Revue, 'id'> = formValue.type === 'livre'
            ? {
                type: 'livre',
                titre: formValue.titre,
                auteur: formValue.auteur,
                codeISBN: formValue.codeISBN,
                caution: formValue.caution,
                localisation: formValue.localisation,
                datePublication: formValue.datePublication,
                emplacementId: 1
            }
            : {
                type: 'revue',
                titre: formValue.titre,
                numeroVolume: parseInt(formValue.volume, 10) || 1,
                caution: formValue.caution,
                localisation: formValue.localisation,
                datePublication: formValue.datePublication,
                emplacementId: 1
            };

        this.ressourceService.createRessource(newRessource as Ressource).subscribe({
            next: (createdRessource) => {
                for (let i = 0; i < formValue.nombreExemplaires; i++) {
                    mockExemplaires.push({
                        id: `EX${Math.random().toString(36).substring(2, 11)}`,
                        ressourceId: createdRessource.id as string,
                        barcode: `BAR${Date.now()}${i}`,
                        disponible: true
                    });
                }
                this.isSubmitting.set(false);
                this.notificationService.success('Ressource ajoutée avec succès');
                this.router.navigate(['/gestion/catalogue']);
            },
            error: (err: Error) => {
                console.error('Erreur lors de la création de la ressource', err);
                this.isSubmitting.set(false);
                this.notificationService.error('Erreur lors de la création de la ressource');
            }
        });
    }

    handleCancel(): void {
        this.router.navigate(['/gestion/catalogue']);
    }
}