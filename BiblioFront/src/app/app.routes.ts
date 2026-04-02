import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { ConsultationCatalogueComponent } from './pages/consultation-catalogue/consultation-catalogue.component';
import { DetailLivreComponent } from './pages/detail-livre/detail-livre.component';
import { GestionCatalogueComponent } from './pages/gestion-catalogue/gestion-catalogue.component';
import { GestionUtilisateurComponent } from './pages/gestion-utilisateur/gestion-utilisateur.component';
import { GestionEmpruntsComponent } from './pages/gestion-emprunts/gestion-emprunts.component';
import { AjouterLivreComponent } from './pages/ajouter-livre/ajouter-livre.component';
import { ModificationLivreComponent } from './pages/modification-livre/modification-livre.component';
import { AjouterUtilisateurComponent } from './pages/ajouter-utilisateur/ajouter-utilisateur.component';
import { ModificationUtilisateurComponent } from './pages/modification-utilisateur/modification-utilisateur.component';
import { MesEmpruntsComponent } from './pages/mes-emprunts/mes-emprunts.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', redirectTo: '/', pathMatch: 'full' },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'catalogue', component: ConsultationCatalogueComponent },
            { path: 'catalogue/:id', component: DetailLivreComponent },
            { path: 'mes-emprunts', component: MesEmpruntsComponent, canActivate: [authGuard] },

            // Librarian Routes
            { path: 'gestion/catalogue', component: GestionCatalogueComponent },
            { path: 'gestion/catalogue/ajouter', component: AjouterLivreComponent },
            { path: 'gestion/catalogue/modifier/:id', component: ModificationLivreComponent },
            { path: 'gestion/utilisateurs', component: GestionUtilisateurComponent },
            { path: 'gestion/utilisateurs/ajouter', component: AjouterUtilisateurComponent },
            { path: 'gestion/utilisateurs/modifier/:id', component: ModificationUtilisateurComponent },
            { path: 'gestion/emprunts', component: GestionEmpruntsComponent },

            // Redirect
            { path: '', redirectTo: '/catalogue', pathMatch: 'full' }
        ]
    }
];
