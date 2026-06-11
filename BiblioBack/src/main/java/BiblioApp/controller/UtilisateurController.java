package BiblioApp.controller;

import BiblioApp.entity.CompteUtilisateur;
import BiblioApp.entity.Utilisateur;
import BiblioApp.repository.UtilisateurRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

  private final UtilisateurRepository utilisateurRepository;

  public UtilisateurController(UtilisateurRepository utilisateurRepository) {
    this.utilisateurRepository = utilisateurRepository;
  }

  @GetMapping
  public ResponseEntity<List<Utilisateur>> getAll() {
    return ResponseEntity.ok(utilisateurRepository.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Utilisateur> getById(@PathVariable Integer id) {
    return utilisateurRepository
        .findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/email/{email}")
  public ResponseEntity<Utilisateur> getByEmail(@PathVariable String email) {
    return utilisateurRepository
        .findByEmail(email)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<Utilisateur> create(@RequestBody Utilisateur utilisateur) {
    if (utilisateur.getMotDePasse() == null || utilisateur.getMotDePasse().isBlank()) {
      utilisateur.setMotDePasse("password123");
    }
    if (utilisateur.getDateInscription() == null) {
      utilisateur.setDateInscription(LocalDate.now());
    }
    if (utilisateur.getCompte() == null) {
      utilisateur.setCompte(new CompteUtilisateur(0));
    }

    Utilisateur saved = utilisateurRepository.save(utilisateur);
    return ResponseEntity.status(HttpStatus.CREATED).body(saved);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Utilisateur> update(
      @PathVariable Integer id, @RequestBody Utilisateur utilisateur) {
    return utilisateurRepository
        .findById(id)
        .map(
            existing -> {
              utilisateur.setId(id);
              if (utilisateur.getMotDePasse() == null || utilisateur.getMotDePasse().isBlank()) {
                utilisateur.setMotDePasse(existing.getMotDePasse());
              }
              if (utilisateur.getDateInscription() == null) {
                utilisateur.setDateInscription(existing.getDateInscription());
              }
              if (utilisateur.getCompte() == null) {
                utilisateur.setCompte(existing.getCompte());
              } else if (existing.getCompte() != null) {
                utilisateur.getCompte().setId(existing.getCompte().getId());
              }
              return ResponseEntity.ok(utilisateurRepository.save(utilisateur));
            })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Integer id) {
    return utilisateurRepository
        .findById(id)
        .map(
            existing -> {
              utilisateurRepository.deleteById(id);
              return ResponseEntity.ok().<Void>build();
            })
        .orElse(ResponseEntity.notFound().build());
  }

  public record LoginRequest(String email, String motDePasse) {}

  @PostMapping("/login")
  public ResponseEntity<Utilisateur> login(@RequestBody LoginRequest request) {
    return utilisateurRepository
        .findByEmail(request.email())
        .filter(
            utilisateur ->
                request.motDePasse() != null
                    && request.motDePasse().equals(utilisateur.getMotDePasse()))
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
  }
}
