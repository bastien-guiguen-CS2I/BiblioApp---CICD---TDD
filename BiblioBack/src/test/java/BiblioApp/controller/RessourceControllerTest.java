package BiblioApp.controller;

import BiblioApp.entity.Livre;
import BiblioApp.repository.RessourceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@DisplayName("Tests du contrôleur RessourceController")
class RessourceControllerTest {

    private RessourceController ressourceController;
    private RessourceRepository ressourceRepository;

    private Livre livre1;
    private Livre livre2;

    @BeforeEach
    void setUp() {
        ressourceRepository = mock(RessourceRepository.class);
        ressourceController = new RessourceController();
        ReflectionTestUtils.setField(ressourceController, "ressourceRepository", ressourceRepository);

        livre1 = new Livre();
        livre1.setId(1);
        livre1.setTitre("Clean Code");
        livre1.setType("LIVRE");
        livre1.setAuteur("Robert C. Martin");
        livre1.setCodeISBN("978-0132350884");
        livre1.setEmplacementId(1);

        livre2 = new Livre();
        livre2.setId(2);
        livre2.setTitre("Java Concurrency in Practice");
        livre2.setType("LIVRE");
        livre2.setAuteur("Brian Goetz");
        livre2.setCodeISBN("978-0321349606");
        livre2.setEmplacementId(2);
    }

    @Test
    @DisplayName("GET /api/ressources - Liste vide")
    void getAllRessources_returnsEmptyList() {
        when(ressourceRepository.findAll()).thenReturn(List.of());

        ResponseEntity<?> response = ressourceController.getAll();

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(0, ((List<?>) response.getBody()).size());
        verify(ressourceRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("GET /api/ressources - Liste avec plusieurs livres")
    void getAllRessources_returnsSeveralBooks() {
        when(ressourceRepository.findAll()).thenReturn(List.of(livre1, livre2));

        ResponseEntity<?> response = ressourceController.getAll();

        assertEquals(200, response.getStatusCode().value());
        List<?> body = (List<?>) response.getBody();
        assertEquals(2, body.size());
        assertEquals("Clean Code", ((Livre) body.get(0)).getTitre());
        assertEquals("Java Concurrency in Practice", ((Livre) body.get(1)).getTitre());
        verify(ressourceRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("GET /api/ressources/{id} - Livre trouvé")
    void getById_returnsBook() {
        when(ressourceRepository.findById(1)).thenReturn(Optional.of(livre1));

        ResponseEntity<?> response = ressourceController.getById(1);

        assertEquals(200, response.getStatusCode().value());
        Livre livre = (Livre) response.getBody();
        assertNotNull(livre);
        assertEquals(1, livre.getId());
        assertEquals("Clean Code", livre.getTitre());
        verify(ressourceRepository, times(1)).findById(1);
    }

    @Test
    @DisplayName("GET /api/ressources/{id} - Livre non trouvé")
    void getById_returnsNotFound() {
        when(ressourceRepository.findById(999)).thenReturn(Optional.empty());

        ResponseEntity<?> response = ressourceController.getById(999);

        assertEquals(404, response.getStatusCode().value());
        assertEquals(null, response.getBody());
        verify(ressourceRepository, times(1)).findById(999);
    }

    @Test
    @DisplayName("POST /api/ressources - Création d'un livre")
    void createRessource_returnsCreatedBook() {
        Livre nouveauLivre = new Livre();
        nouveauLivre.setTitre("Design Patterns");
        nouveauLivre.setType("LIVRE");
        nouveauLivre.setAuteur("Gang of Four");
        nouveauLivre.setCodeISBN("978-0201633610");
        nouveauLivre.setEmplacementId(3);

        Livre savedLivre = new Livre();
        savedLivre.setId(3);
        savedLivre.setTitre("Design Patterns");
        savedLivre.setType("LIVRE");
        savedLivre.setAuteur("Gang of Four");
        savedLivre.setCodeISBN("978-0201633610");
        savedLivre.setEmplacementId(3);

        when(ressourceRepository.save(nouveauLivre)).thenReturn(savedLivre);

        ResponseEntity<?> response = ressourceController.create(nouveauLivre);

        assertEquals(201, response.getStatusCode().value());
        Livre livre = (Livre) response.getBody();
        assertNotNull(livre);
        assertEquals(3, livre.getId());
        assertEquals("Design Patterns", livre.getTitre());
        verify(ressourceRepository, times(1)).save(nouveauLivre);
    }
}