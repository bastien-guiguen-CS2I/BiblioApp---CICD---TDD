import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { mockUtilisateurs, mockComptes } from '../../services/mock-data';
import { Utilisateur, UserType, Enseignant, Etudiant, Particulier } from '../../models/models';
import { NotificationService } from '../../services/notification.service';

interface AddUserForm {
    type: UserType;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    departement: string;
    annee: number;
    organisation: string;
    caution: number;
}

@Component({
    selector: 'app-ajouter-utilisateur',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './ajouter-utilisateur.component.html'
})
export class AjouterUtilisateurComponent {
    form = signal<AddUserForm>({
        type: 'etudiant',
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
        departement: '',
        annee: 1,
        organisation: '',
        caution: 100
    });

    isSubmitting = signal(false);

    constructor(
        private router: Router,
        private notificationService: NotificationService
    ) { }

    onTypeChange(newType: string): void {
        this.form.update(f => ({
            ...f,
            type: newType as UserType,
            departement: '',
            annee: 1,
            organisation: ''
        }));
    }

    private validateForm(): string | null {
        const formValue = this.form();

        if (!formValue.nom.trim()) {
            return 'Le nom est requis';
        }
        if (!formValue.prenom.trim()) {
            return 'Le prénom est requis';
        }
        if (!formValue.email.trim()) {
            return "L'email est requis";
        }

        if (formValue.type === 'enseignant' && !formValue.departement.trim()) {
            return 'Le département est requis pour un enseignant';
        }
        if (formValue.type === 'etudiant' && formValue.annee < 1) {
            return "L'année d'études est requise";
        }
        if (formValue.type === 'particulier' && !formValue.organisation.trim()) {
            return "L'organisation est requise pour un particulier";
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
            const newId = `U${Math.random().toString(36).substr(2, 9)}`;

            let newUser: Utilisateur;
            if (formValue.type === 'enseignant') {
                newUser = {
                    id: newId,
                    type: 'enseignant',
                    nom: formValue.nom,
                    prenom: formValue.prenom,
                    email: formValue.email,
                    telephone: formValue.telephone,
                    adresse: formValue.adresse,
                    departement: formValue.departement
                } as Enseignant;
            } else if (formValue.type === 'etudiant') {
                newUser = {
                    id: newId,
                    type: 'etudiant',
                    nom: formValue.nom,
                    prenom: formValue.prenom,
                    email: formValue.email,
                    telephone: formValue.telephone,
                    adresse: formValue.adresse,
                    anneeEtudes: formValue.annee
                } as Etudiant;
            } else {
                newUser = {
                    id: newId,
                    type: 'particulier',
                    nom: formValue.nom,
                    prenom: formValue.prenom,
                    email: formValue.email,
                    telephone: formValue.telephone,
                    adresse: formValue.adresse,
                    organisation: formValue.organisation
                } as Particulier;
            }

            mockUtilisateurs.push(newUser);
            mockComptes.push({
                id: `C${Math.random().toString(36).substr(2, 9)}`,
                utilisateurId: newId,
                solde: formValue.caution,
                dateCreation: new Date().toISOString().split('T')[0]
            });

            this.isSubmitting.set(false);
            this.notificationService.success("L'utilisateur a été ajouté avec succès");
            setTimeout(() => {
                this.router.navigate(['/gestion/utilisateurs']);
            }, 1000);
        }, 500);
    }

    handleCancel(): void {
        this.router.navigate(['/gestion/utilisateurs']);
    }
}
