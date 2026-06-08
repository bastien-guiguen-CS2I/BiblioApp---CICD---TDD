import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Utilisateur, UserType } from '../../models/models';
import { NotificationService } from '../../services/notification.service';
import { UtilisateurService } from '../../services/utilisateur.service';

interface ModifyUserForm {
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
    selector: 'app-modification-utilisateur',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './modification-utilisateur.component.html'
})
export class ModificationUtilisateurComponent implements OnInit {
    userId = signal<string>('');
    user = signal<Utilisateur | null>(null);
    compte = signal<{ solde: number } | null>(null);

    form = signal<ModifyUserForm>({
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
        soldeDisponible: 0
    });

    isSubmitting = signal(false);
    isLoading = signal(true);

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private notificationService: NotificationService,
        private utilisateurService: UtilisateurService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.userId.set(id);
                this.loadUtilisateur(id);
            }
        });
    }

    loadUtilisateur(id: string): void {
        this.isLoading.set(true);
        this.utilisateurService.getUtilisateurById(id).subscribe({
            next: utilisateur => {
                this.user.set(utilisateur);
                if (utilisateur.compte) {
                    this.compte.set({ solde: utilisateur.compte.soldeDisponible });
                }

                const formData: ModifyUserForm = {
                    nom: utilisateur.nom,
                    prenom: utilisateur.prenom,
                    email: utilisateur.email,
                    telephone: utilisateur.telephone || '',
                    adresse: utilisateur.adresse || '',
                    nomDepartement: '',
                    grade: '',
                    anneeUniversitaire: '',
                    numeroEtudiant: '',
                    profession: '',
                    numeroEmploye: '',
                    soldeDisponible: utilisateur.compte?.soldeDisponible || 0
                };

                if (utilisateur.type === 'enseignant') {
                    formData.nomDepartement = utilisateur.nomDepartement;
                    formData.grade = utilisateur.grade;
                } else if (utilisateur.type === 'etudiant') {
                    formData.anneeUniversitaire = utilisateur.anneeUniversitaire;
                    formData.numeroEtudiant = utilisateur.numeroEtudiant;
                } else if (utilisateur.type === 'particulier') {
                    formData.profession = utilisateur.profession;
                } else if (utilisateur.type === 'bibliothecaire') {
                    formData.numeroEmploye = utilisateur.numeroEmploye;
                }

                this.form.set(formData);
                this.isLoading.set(false);
            },
            error: () => {
                this.notificationService.error('Utilisateur non trouvé');
                this.isLoading.set(false);
            }
        });
    }

    getType(): UserType | null {
        return this.user()?.type || null;
    }

    private validateForm(): string | null {
        const formValue = this.form();

        if (!formValue.nom.trim() || !formValue.prenom.trim()) {
            return 'Le nom et le prénom sont requis';
        }
        if (!formValue.email.trim()) {
            return "L'email est requis";
        }

        return null;
    }

    handleSubmit(): void {
        const validationError = this.validateForm();
        if (validationError) {
            this.notificationService.error(validationError);
            return;
        }

        const u = this.user();
        if (!u) {
            this.notificationService.error('Utilisateur non trouvé');
            return;
        }

        this.isSubmitting.set(true);
        const formValue = this.form();

        this.utilisateurService.updateUtilisateur(u.id, {
            ...u,
            nom: formValue.nom,
            prenom: formValue.prenom,
            email: formValue.email,
            telephone: formValue.telephone,
            adresse: formValue.adresse,
            compte: { soldeDisponible: formValue.soldeDisponible }
        } as any).subscribe({
            next: () => {
                this.isSubmitting.set(false);
                this.notificationService.success("L'utilisateur a été modifié avec succès");
                this.router.navigate(['/gestion/utilisateurs']);
            },
            error: () => {
                this.isSubmitting.set(false);
                this.notificationService.error("La modification de l'utilisateur a échoué");
            }
        });
    }

    handleCancel(): void {
        this.router.navigate(['/gestion/utilisateurs']);
    }
}
