import {
    Utilisateur,
    Compte,
    Ressource,
    Exemplaire,
    Emplacement,
    Emprunt
} from '../models/models';

export const mockUtilisateurs: Utilisateur[] = [
    {
        id: 'u1',
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@univ.fr',
        telephone: '+33 1 23 45 67 89',
        adresse: '1 rue de la Paix, Paris',
        type: 'enseignant',
        departement: 'Informatique'
    },
    {
        id: 'u2',
        nom: 'Martin',
        prenom: 'Sophie',
        email: 'sophie.martin@etu.univ.fr',
        telephone: '+33 6 12 34 56 78',
        adresse: '12 avenue des Champs, Paris',
        type: 'etudiant',
        anneeEtudes: 3
    },
    {
        id: 'u3',
        nom: 'Bernard',
        prenom: 'Luc',
        email: 'luc.bernard@gmail.com',
        telephone: '+33 1 98 76 54 32',
        adresse: '5 boulevard Voltaire, Paris',
        type: 'particulier',
        organisation: 'Bibliothèque Libre'
    },
    {
        id: 'u4',
        nom: 'Lefebvre',
        prenom: 'Marie',
        email: 'marie.lefebvre@univ.fr',
        telephone: '+33 1 45 67 89 01',
        adresse: '8 rue Lafayette, Paris',
        type: 'enseignant',
        departement: 'Histoire'
    },
    {
        id: 'u5',
        nom: 'Petit',
        prenom: 'Thomas',
        email: 'thomas.petit@etu.univ.fr',
        telephone: '+33 6 98 76 54 32',
        adresse: '22 rue du Commerce, Paris',
        type: 'etudiant',
        anneeEtudes: 1
    },
    {
        id: 'u6',
        nom: 'Garcia',
        prenom: 'Aurora',
        email: 'aurora.garcia@univ.fr',
        telephone: '+33 1 15 26 37 48',
        adresse: '95 rue de Rivoli, Paris',
        type: 'enseignant',
        departement: 'Littérature'
    },
    {
        id: 'u7',
        nom: 'Durand',
        prenom: 'Alice',
        email: 'admin@biblioapp.fr',
        telephone: '+33 1 40 51 75 85',
        adresse: 'Bibliothèque Universitaire, 123 Rue de la Sorbonne, Paris',
        type: 'particulier',
        organisation: 'Université Paris-Sorbonne'
    }
];

export const mockComptes: Compte[] = [
    { id: 'c1', utilisateurId: 'u1', solde: 150, dateCreation: '2023-01-10' },
    { id: 'c2', utilisateurId: 'u2', solde: 50, dateCreation: '2023-02-15' },
    { id: 'c3', utilisateurId: 'u3', solde: 100, dateCreation: '2023-03-20' },
    { id: 'c4', utilisateurId: 'u4', solde: 200, dateCreation: '2023-01-05' },
    { id: 'c5', utilisateurId: 'u5', solde: 20, dateCreation: '2023-09-01' },
    { id: 'c6', utilisateurId: 'u6', solde: 180, dateCreation: '2023-01-15' },
    { id: 'c7', utilisateurId: 'u7', solde: 0, dateCreation: '2023-01-01' }
];

export const mockEmplacements: Emplacement[] = [
    {
        id: 'emp1',
        numeroTravee: 'A1',
        numeroEtagere: '1',
        niveau: '1',
        categorie: 'informatique'
    },
    {
        id: 'emp2',
        numeroTravee: 'A1',
        numeroEtagere: '2',
        niveau: '2',
        categorie: 'science'
    },
    {
        id: 'emp3',
        numeroTravee: 'B1',
        numeroEtagere: '1',
        niveau: '1',
        categorie: 'roman'
    },
    {
        id: 'emp4',
        numeroTravee: 'B2',
        numeroEtagere: '1',
        niveau: '1',
        categorie: 'policier'
    },
    {
        id: 'emp5',
        numeroTravee: 'C1',
        numeroEtagere: '1',
        niveau: '1',
        categorie: 'histoire'
    }
];

export const mockRessources: Ressource[] = [
    {
        id: 'r1',
        type: 'livre',
        titre: 'Clean Code',
        auteur: 'Robert C. Martin',
        codeISBN: '978-0132350884',
        caution: 40,
        emplacementId: 'emp1',
        localisation: 'Rayon 1, Étagère A',
        datePublication: '2008-08-11'
    },
    {
        id: 'r2',
        type: 'livre',
        titre: 'Design Patterns',
        auteur: 'Erich Gamma',
        codeISBN: '978-0201633610',
        caution: 45,
        emplacementId: 'emp1',
        localisation: 'Rayon 1, Étagère A',
        datePublication: '1994-11-10'
    },
    {
        id: 'r3',
        type: 'livre',
        titre: "L'Étranger",
        auteur: 'Albert Camus',
        codeISBN: '978-2070360024',
        caution: 15,
        emplacementId: 'emp3',
        localisation: 'Rayon 3, Étagère C',
        datePublication: '1942-06-15'
    },
    {
        id: 'r4',
        type: 'livre',
        titre: "Le Crime de l'Orient-Express",
        auteur: 'Agatha Christie',
        codeISBN: '978-2253010425',
        caution: 20,
        emplacementId: 'emp4',
        localisation: 'Rayon 4, Étagère A',
        datePublication: '1934-01-01'
    },
    {
        id: 'r5',
        type: 'livre',
        titre: 'Une brève histoire du temps',
        auteur: 'Stephen Hawking',
        codeISBN: '978-2081422000',
        caution: 30,
        emplacementId: 'emp2',
        localisation: 'Rayon 2, Étagère B',
        datePublication: '1988-04-01'
    },
    {
        id: 'r6',
        type: 'revue',
        titre: 'Science & Vie',
        numeroVolume: 1250,
        caution: 10,
        emplacementId: 'emp2',
        localisation: 'Rayon 2, Étagère B',
        datePublication: '2023-10-01'
    },
    {
        id: 'r7',
        type: 'revue',
        titre: "L'Histoire",
        numeroVolume: 500,
        caution: 10,
        emplacementId: 'emp5',
        localisation: 'Rayon 5, Étagère A',
        datePublication: '2023-09-01'
    }
];

export const mockExemplaires: Exemplaire[] = [
    { id: 'ex1', barcode: '100000001', ressourceId: 'r1', disponible: true },
    { id: 'ex2', barcode: '100000002', ressourceId: 'r1', disponible: false },
    { id: 'ex3', barcode: '100000003', ressourceId: 'r2', disponible: true },
    { id: 'ex4', barcode: '100000004', ressourceId: 'r3', disponible: false },
    { id: 'ex5', barcode: '100000005', ressourceId: 'r3', disponible: true },
    { id: 'ex6', barcode: '100000006', ressourceId: 'r4', disponible: true },
    { id: 'ex7', barcode: '100000007', ressourceId: 'r5', disponible: false },
    { id: 'ex8', barcode: '100000008', ressourceId: 'r6', disponible: true },
    { id: 'ex9', barcode: '100000009', ressourceId: 'r7', disponible: true }
];

const today = new Date();
const pastDate = new Date(today);
pastDate.setDate(today.getDate() - 20);
const recentDate = new Date(today);
recentDate.setDate(today.getDate() - 5);
const futureDate = new Date(today);
futureDate.setDate(today.getDate() + 14);

export const mockEmprunts: Emprunt[] = [
    {
        id: 'e1',
        utilisateurId: 'u1',
        exemplaireId: 'ex1',
        dateEmprunt: recentDate.toISOString().split('T')[0],
        dateRetourPrevue: futureDate.toISOString().split('T')[0],
        dateRetourEffective: null,
        enRetard: false
    },
    {
        id: 'e2',
        utilisateurId: 'u2',
        exemplaireId: 'ex4',
        dateEmprunt: pastDate.toISOString().split('T')[0],
        dateRetourPrevue: today.toISOString().split('T')[0],
        dateRetourEffective: null,
        enRetard: true
    },
    {
        id: 'e3',
        utilisateurId: 'u3',
        exemplaireId: 'ex6',
        dateEmprunt: recentDate.toISOString().split('T')[0],
        dateRetourPrevue: futureDate.toISOString().split('T')[0],
        dateRetourEffective: null,
        enRetard: false
    }
];
