import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { mockRessources, mockExemplaires } from '../../services/mock-data';
import { Ressource, Livre, Revue } from '../../models/models';
import { NotificationService } from '../../services/notification.service';

interface ModifyResourceForm {
    titre: string;
    auteur: string;
    volume: string;
    isbn: string;
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
        isbn: '',
        datePublication: '',
        caution: 0,
        localisation: ''
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
                this.resourceId.set(id);
                this.loadRessource(id);
            }
        });
    }

    loadRessource(id: string): void {
        this.isLoading.set(true);
        setTimeout(() => {
            const res = mockRessources.find(r => r.id === id);
            if (res) {
                this.resource.set(res);
                const formData: ModifyResourceForm = {
                    titre: res.titre,
                    auteur: res.type === 'livre' ? (res as Livre).auteur : '',
                    volume: res.type === 'revue' ? String((res as Revue).numeroVolume) : '',
                    isbn: res.type === 'livre' ? ((res as Livre).isbn || '') : '',
                    datePublication: res.datePublication || '',
                    caution: res.caution,
                    localisation: res.localisation || ''
                };
                this.form.set(formData);
                this.exemplairesCount.set(mockExemplaires.filter(ex => ex.ressourceId === id).length);
            }
            this.isLoading.set(false);
        }, 300);
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

        setTimeout(() => {
            const index = mockRessources.findIndex(r => r.id === res.id);
            if (index >= 0) {
                if (res.type === 'livre') {
                    mockRessources[index] = {
                        ...res,
                        titre: formValue.titre,
                        auteur: formValue.auteur,
                        isbn: formValue.isbn,
                        datePublication: formValue.datePublication,
                        caution: formValue.caution,
                        localisation: formValue.localisation
                    } as Livre;
                } else {
                    mockRessources[index] = {
                        ...res,
                        titre: formValue.titre,
                        numeroVolume: parseInt(formValue.volume, 10) || 1,
                        datePublication: formValue.datePublication,
                        caution: formValue.caution,
                        localisation: formValue.localisation
                    } as Revue;
                }
            }

            this.isSubmitting.set(false);
            this.notificationService.success('La ressource a été modifiée avec succès');
            setTimeout(() => {
                this.router.navigate(['/gestion/catalogue']);
            }, 1000);
        }, 500);
    }

    handleCancel(): void {
        this.router.navigate(['/gestion/catalogue']);
    }
}
