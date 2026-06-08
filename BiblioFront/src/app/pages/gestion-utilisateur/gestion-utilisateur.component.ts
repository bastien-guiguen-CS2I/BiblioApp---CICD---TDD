import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Utilisateur, Enseignant, Etudiant } from '../../models/models';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { NotificationService } from '../../services/notification.service';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
    selector: 'app-gestion-utilisateur',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './gestion-utilisateur.component.html'
})
export class GestionUtilisateurComponent implements OnInit {
    utilisateurs = signal<Utilisateur[]>([]);
    search = '';
    isLoading = signal(true);

    constructor(
        private confirmDialogService: ConfirmDialogService,
        private notificationService: NotificationService,
        private utilisateurService: UtilisateurService
    ) { }

    ngOnInit(): void {
        this.fetchUtilisateurs();
    }

    getTypeDetails(user: Utilisateur): string {
        if (user.type === 'enseignant') {
            const enseignant = user as Enseignant;
            return `${enseignant.nomDepartement} - ${enseignant.grade}`;
        }
        if (user.type === 'etudiant') {
            const etudiant = user as Etudiant;
            return `${etudiant.anneeUniversitaire} - ${etudiant.numeroEtudiant}`;
        }
        if (user.type === 'bibliothecaire') {
            return `Employé ${user.numeroEmploye}`;
        }
        return '-';
    }

    filteredUsers = (): Utilisateur[] => {
        return this.utilisateurs().filter(u =>
            u.nom.toLowerCase().includes(this.search.toLowerCase()) ||
            u.prenom.toLowerCase().includes(this.search.toLowerCase()) ||
            u.email.toLowerCase().includes(this.search.toLowerCase())
        );
    };

    fetchUtilisateurs(): void {
        this.isLoading.set(true);
        this.utilisateurService.getAllUtilisateurs().subscribe({
            next: utilisateurs => {
                this.utilisateurs.set(utilisateurs);
                this.isLoading.set(false);
            },
            error: () => {
                this.notificationService.error('Impossible de charger les utilisateurs');
                this.isLoading.set(false);
            }
        });
    }

    handleDelete(id: string): void {
        this.confirmDialogService.open({
            title: "Supprimer l'utilisateur",
            message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur?',
            confirmText: 'Supprimer',
            cancelText: 'Annuler',
            isDestructive: true
        }).subscribe(result => {
            if (result) {
                this.utilisateurService.deleteUtilisateur(id).subscribe({
                    next: () => {
                        this.utilisateurs.update(users => users.filter(u => u.id !== id));
                        this.notificationService.success("L'utilisateur a été supprimé");
                    },
                    error: () => this.notificationService.error('Suppression impossible')
                });
            }
        });
    }
}
