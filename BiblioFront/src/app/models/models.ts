export type UserType = 'enseignant' | 'etudiant' | 'particulier';
export type ResourceType = 'livre' | 'revue';

export interface Emplacement {
    id: string;
    numeroTravee: string;
    numeroEtagere: string;
    niveau: string;
    categorie: string;
}

export interface Compte {
    id: string;
    utilisateurId: string;
    solde: number;
    dateCreation: string;
}

export interface BaseUser {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    type: UserType;
    telephone?: string;
    adresse?: string;
}

export interface Enseignant extends BaseUser {
    type: 'enseignant';
    departement: string;
}

export interface Etudiant extends BaseUser {
    type: 'etudiant';
    anneeEtudes: number;
}

export interface Particulier extends BaseUser {
    type: 'particulier';
    organisation: string;
}

export type Utilisateur = Enseignant | Etudiant | Particulier;

export interface BaseRessource {
    id: number | string;
    titre: string;
    type: ResourceType;
    caution: number;
    emplacementId?: number | string;
    localisation?: string;
    datePublication?: string;
}

export interface Livre extends BaseRessource {
    type: 'livre';
    auteur: string;
    codeISBN?: string;
}

export interface Revue extends BaseRessource {
    type: 'revue';
    numeroVolume: number;
}

export type Ressource = Livre | Revue;

export interface Exemplaire {
    id: string;
    ressourceId: string;
    barcode: string;
    disponible: boolean;
}

export interface Emprunt {
    id: string;
    utilisateurId: string;
    exemplaireId: string;
    dateEmprunt: string;
    dateRetourPrevue: string;
    dateRetourEffective?: string | null;
    enRetard?: boolean;
}

