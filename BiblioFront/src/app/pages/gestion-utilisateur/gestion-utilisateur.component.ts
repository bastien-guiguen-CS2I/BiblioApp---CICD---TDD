import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { mockUtilisateurs, mockComptes } from '../../services/mock-data';
import { Utilisateur, Compte, Enseignant, Etudiant } from '../../models/models';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { NotificationService } from '../../services/notification.service';

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
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.fetchUtilisateurs();
    }

    getTypeDetails(user: Utilisateur): string {
        if (user.type === 'enseignant') {
            const enseignant = user as Enseignant;
            return enseignant.departement;
        }
        if (user.type === 'etudiant') {
            const etudiant = user as Etudiant;
            return `Année ${etudiant.anneeEtudes}`;
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

    getCompte(userId: string): Compte | undefined {
        return mockComptes.find(c => c.utilisateurId === userId);
    }

    fetchUtilisateurs(): void {
        this.isLoading.set(true);
        setTimeout(() => {
            this.utilisateurs.set(mockUtilisateurs);
            this.isLoading.set(false);
        }, 300);
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
                this.utilisateurs.update(users =>
                    users.filter(u => u.id !== id)
                );
                this.notificationService.success("L'utilisateur a été supprimé");
            }
        });
    }
}
