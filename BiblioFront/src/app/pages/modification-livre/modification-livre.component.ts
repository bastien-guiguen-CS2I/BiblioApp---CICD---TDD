import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { mockExemplaires } from '../../services/mock-data';
import { Ressource, Livre, Revue } from '../../models/models';
import { NotificationService } from '../../services/notification.service';
import { RessourceService } from '../../services/ressource.service';

interface ModifyResourceForm {
    titre: string;
    auteur: string;
    volume: string;
    codeISBN: string;
    datePublication: string;
    caution: number;
    localisation: string;
}

@Component({
    selector: 'app-modification-livre',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './modification-livre.component.html'
})
export class ModificationLivreComponent implements OnInit {
    resourceId = signal<string>('');
    resource = signal<Ressource | null>(null);
    exemplairesCount = signal(0);

    form = signal<ModifyResourceForm>({
        titre: '',
        auteur: '',
        volume: '',
        codeISBN: '',
        datePublication: '',
        caution: 0,
        localisation: ''
    });

    isSubmitting = signal(false);
    isLoading = signal(true);

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ressourceService: RessourceService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.resourceId.set(id);
                this.loadRessource(id);
            }
        });
    }

    loadRessource(id: string | number): void {
        this.isLoading.set(true);
        this.ressourceService.getRessourceById(id).subscribe({
            next: (res) => {
                this.resource.set(res);
                const formData: ModifyResourceForm = {
                    titre: res.titre,
                    auteur: res.type === 'livre' ? (res as Livre).auteur : '',
                    volume: res.type === 'revue' ? String((res as Revue).numeroVolume) : '',
                    codeISBN: res.type === 'livre' ? ((res as Livre).codeISBN || '') : '',
                    datePublication: res.datePublication || '',
                    caution: res.caution,
                    localisation: res.localisation || ''
                };
                this.form.set(formData);
                this.exemplairesCount.set(mockExemplaires.filter(ex => ex.ressourceId === id).length);
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Erreur lors du chargement de la ressource', err);
                this.isLoading.set(false);
            }
        });
    }

    getType(): 'livre' | 'revue' | null {
        return this.resource()?.type || null;
    }

    private validateForm(): string | null {
        const formValue = this.form();
        const res = this.resource();

        if (!formValue.titre.trim()) {
            return 'Le titre est requis';
        }
        if (res?.type === 'livre' && !formValue.auteur.trim()) {
            return "L'auteur est requis";
        }
        if (res?.type === 'revue' && !formValue.volume.trim()) {
            return 'Le numéro de volume est requis';
        }
        if (formValue.caution <= 0) {
            return 'La caution doit être supérieure à 0';
        }

        return null;
    }

    handleSubmit(): void {
        const validationError = this.validateForm();
        if (validationError) {
            this.notificationService.error(validationError);
            return;
        }

        const res = this.resource();
        if (!res) {
            this.notificationService.error('Ressource non trouvée');
            return;
        }

        this.isSubmitting.set(true);
        const formValue = this.form();

        const updatedRessource: Ressource = res.type === 'livre'
            ? {
                ...res,
                titre: formValue.titre,
                auteur: formValue.auteur,
                codeISBN: formValue.codeISBN,
                datePublication: formValue.datePublication,
                caution: formValue.caution,
                localisation: formValue.localisation
            } as Livre
            : {
                ...res,
                titre: formValue.titre,
                numeroVolume: parseInt(formValue.volume, 10) || 1,
                datePublication: formValue.datePublication,
                caution: formValue.caution,
                localisation: formValue.localisation
            } as Revue;

        this.ressourceService.updateRessource(res.id as string | number, updatedRessource).subscribe({
            next: () => {
                this.isSubmitting.set(false);
                this.notificationService.success('La ressource a été modifiée avec succès');
                this.router.navigate(['/gestion/catalogue']);
            },
            error: (err) => {
                console.error('Erreur lors de la modification de la ressource', err);
                this.isSubmitting.set(false);
                this.notificationService.error('Erreur lors de la modification de la ressource');
            }
        });
    }

    handleCancel(): void {
        this.router.navigate(['/gestion/catalogue']);
    }
}
