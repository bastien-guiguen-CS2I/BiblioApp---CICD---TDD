import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur, UserType } from '../../models/models';
import { NotificationService } from '../../services/notification.service';
import { UtilisateurService } from '../../services/utilisateur.service';

interface AddUserForm {
    type: UserType;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    nomDepartement: string;
    grade: string;
    anneeUniversitaire: string;
    numeroEtudiant: string;
    profession: string;
    numeroEmploye: string;
    soldeDisponible: number;
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
        nomDepartement: '',
        grade: '',
        anneeUniversitaire: '',
        numeroEtudiant: '',
        profession: '',
        numeroEmploye: '',
        soldeDisponible: 100
    });

    isSubmitting = signal(false);

    constructor(
        private router: Router,
        private notificationService: NotificationService,
        private utilisateurService: UtilisateurService
    ) { }

    onTypeChange(newType: string): void {
        this.form.update(f => ({
            ...f,
            type: newType as UserType,
            nomDepartement: '',
            grade: '',
            anneeUniversitaire: '',
            numeroEtudiant: '',
            profession: '',
            numeroEmploye: ''
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

        if (formValue.type === 'enseignant' && !formValue.nomDepartement.trim()) {
            return 'Le département est requis pour un enseignant';
        }
        if (formValue.type === 'etudiant' && !formValue.numeroEtudiant.trim()) {
            return "Le numéro étudiant est requis";
        }
        if (formValue.type === 'particulier' && !formValue.profession.trim()) {
            return "La profession est requise pour un particulier";
        }
        if (formValue.type === 'bibliothecaire' && !formValue.numeroEmploye.trim()) {
            return "Le numéro employé est requis pour un bibliothécaire";
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

        this.utilisateurService.createUtilisateur({
            ...formValue,
            compte: { soldeDisponible: formValue.soldeDisponible }
        } as any).subscribe({
            next: () => {
                this.isSubmitting.set(false);
                this.notificationService.success("L'utilisateur a été ajouté avec succès");
                this.router.navigate(['/gestion/utilisateurs']);
            },
            error: () => {
                this.isSubmitting.set(false);
                this.notificationService.error("La création de l'utilisateur a échoué");
            }
        });
    }

    handleCancel(): void {
        this.router.navigate(['/gestion/utilisateurs']);
    }
}
