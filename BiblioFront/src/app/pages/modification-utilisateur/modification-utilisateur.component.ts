import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { mockUtilisateurs, mockComptes } from '../../services/mock-data';
import { Utilisateur, UserType, Enseignant, Etudiant, Particulier } from '../../models/models';
import { NotificationService } from '../../services/notification.service';

interface ModifyUserForm {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    departement: string;
    annee: number;
    organisation: string;
    solde: number;
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
        departement: '',
        annee: 1,
        organisation: '',
        solde: 0
    });

    isSubmitting = signal(false);
    isLoading = signal(true);

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private notificationService: NotificationService
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
        setTimeout(() => {
            const u = mockUtilisateurs.find(usr => usr.id === id);
            const c = mockComptes.find(cte => cte.utilisateurId === id);

            if (u) {
                this.user.set(u);
                if (c) this.compte.set({ solde: c.solde });

                const formData: ModifyUserForm = {
                    nom: u.nom,
                    prenom: u.prenom,
                    email: u.email,
                    telephone: u.telephone || '',
                    adresse: u.adresse || '',
                    departement: '',
                    annee: 1,
                    organisation: '',
                    solde: c?.solde || 0
                };

                if (u.type === 'enseignant') {
                    const enseignant = u as Enseignant;
                    formData.departement = enseignant.departement;
                } else if (u.type === 'etudiant') {
                    const etudiant = u as Etudiant;
                    formData.annee = etudiant.anneeEtudes;
                } else if (u.type === 'particulier') {
                    const particulier = u as Particulier;
                    formData.organisation = particulier.organisation;
                }

                this.form.set(formData);
            }
            this.isLoading.set(false);
        }, 300);
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

        setTimeout(() => {
            const index = mockUtilisateurs.findIndex(usr => usr.id === u.id);
            if (index >= 0) {
                const updated: Utilisateur = {
                    ...u,
                    nom: formValue.nom,
                    prenom: formValue.prenom,
                    email: formValue.email,
                    telephone: formValue.telephone,
                    adresse: formValue.adresse
                };

                if (u.type === 'enseignant') {
                    (updated as Enseignant).departement = formValue.departement;
                } else if (u.type === 'etudiant') {
                    (updated as Etudiant).anneeEtudes = formValue.annee;
                } else if (u.type === 'particulier') {
                    (updated as Particulier).organisation = formValue.organisation;
                }

                mockUtilisateurs[index] = updated;
            }

            // Update compte solde
            const compteIndex = mockComptes.findIndex(c => c.utilisateurId === u.id);
            if (compteIndex >= 0) {
                mockComptes[compteIndex].solde = formValue.solde;
            }

            this.isSubmitting.set(false);
            this.notificationService.success("L'utilisateur a été modifié avec succès");
            setTimeout(() => {
                this.router.navigate(['/gestion/utilisateurs']);
            }, 1000);
        }, 500);
    }

    handleCancel(): void {
        this.router.navigate(['/gestion/utilisateurs']);
    }
}
