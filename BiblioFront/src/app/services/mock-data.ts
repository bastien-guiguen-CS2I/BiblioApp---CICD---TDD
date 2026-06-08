import {
    Ressource,
    Exemplaire,
    Emplacement,
    Emprunt
} from '../models/models';

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
