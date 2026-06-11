package BiblioApp.config;

import BiblioApp.entity.Bibliothecaire;
import BiblioApp.entity.CompteUtilisateur;
import BiblioApp.entity.Enseignant;
import BiblioApp.entity.Etudiant;
import BiblioApp.entity.Livre;
import BiblioApp.entity.Particulier;
import BiblioApp.entity.Revue;
import BiblioApp.repository.RessourceRepository;
import BiblioApp.repository.UtilisateurRepository;
import java.time.LocalDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

  @Bean
  CommandLineRunner initializeData(
      RessourceRepository ressourceRepository, UtilisateurRepository utilisateurRepository) {
    return (args) -> {
      ressourceRepository.save(
          new Livre(
              "Clean Code",
              "LIVRE",
              1,
              40,
              "Rayon 1, Étagère A",
              LocalDate.of(2008, 8, 11),
              "Robert C. Martin",
              "978-0132350884"));
      ressourceRepository.save(
          new Livre(
              "Design Patterns",
              "LIVRE",
              1,
              45,
              "Rayon 1, Étagère A",
              LocalDate.of(1994, 11, 10),
              "Erich Gamma",
              "978-0201633610"));
      ressourceRepository.save(
          new Livre(
              "L'Étranger",
              "LIVRE",
              3,
              15,
              "Rayon 3, Étagère C",
              LocalDate.of(1942, 6, 15),
              "Albert Camus",
              "978-2070360024"));
      ressourceRepository.save(
          new Livre(
              "Le Crime de l'Orient-Express",
              "LIVRE",
              4,
              20,
              "Rayon 4, Étagère A",
              LocalDate.of(1934, 1, 1),
              "Agatha Christie",
              "978-2253010425"));
      ressourceRepository.save(
          new Livre(
              "Une brève histoire du temps",
              "LIVRE",
              2,
              30,
              "Rayon 2, Étagère B",
              LocalDate.of(1988, 4, 1),
              "Stephen Hawking",
              "978-2081422000"));
      ressourceRepository.save(
          new Revue(
              "Science & Vie",
              "REVUE",
              2,
              10,
              "Rayon 2, Étagère B",
              LocalDate.of(2023, 10, 1),
              1250));
      ressourceRepository.save(
          new Revue(
              "L'Histoire", "REVUE", 5, 10, "Rayon 5, Étagère A", LocalDate.of(2023, 9, 1), 500));

      if (utilisateurRepository.count() == 0) {
        utilisateurRepository.save(createBibliothecaire());
        utilisateurRepository.save(createEnseignant());
        utilisateurRepository.save(createEtudiant());
        utilisateurRepository.save(createParticulier());
      }
    };
  }

  private Bibliothecaire createBibliothecaire() {
    Bibliothecaire bibliothecaire = new Bibliothecaire();
    bibliothecaire.setNom("Durand");
    bibliothecaire.setPrenom("Alice");
    bibliothecaire.setEmail("admin@biblioapp.fr");
    bibliothecaire.setTelephone("+33 1 40 51 75 85");
    bibliothecaire.setAdresse("Bibliothèque Universitaire, 123 Rue de la Sorbonne, Paris");
    bibliothecaire.setDateInscription(LocalDate.of(2023, 1, 1));
    bibliothecaire.setMotDePasse("password123");
    bibliothecaire.setNumeroEmploye("EMP-0001");
    bibliothecaire.setCompte(new CompteUtilisateur(0));
    return bibliothecaire;
  }

  private Enseignant createEnseignant() {
    Enseignant enseignant = new Enseignant();
    enseignant.setNom("Dupont");
    enseignant.setPrenom("Jean");
    enseignant.setEmail("jean.dupont@univ.fr");
    enseignant.setTelephone("+33 1 23 45 67 89");
    enseignant.setAdresse("1 rue de la Paix, Paris");
    enseignant.setDateInscription(LocalDate.of(2023, 1, 10));
    enseignant.setMotDePasse("password123");
    enseignant.setNomDepartement("Informatique");
    enseignant.setGrade("Maître de conférences");
    enseignant.setCompte(new CompteUtilisateur(150));
    return enseignant;
  }

  private Etudiant createEtudiant() {
    Etudiant etudiant = new Etudiant();
    etudiant.setNom("Martin");
    etudiant.setPrenom("Sophie");
    etudiant.setEmail("sophie.martin@etu.univ.fr");
    etudiant.setTelephone("+33 6 12 34 56 78");
    etudiant.setAdresse("12 avenue des Champs, Paris");
    etudiant.setDateInscription(LocalDate.of(2023, 2, 15));
    etudiant.setMotDePasse("password123");
    etudiant.setAnneeUniversitaire("3e année");
    etudiant.setNumeroEtudiant("ETU-2026-003");
    etudiant.setCompte(new CompteUtilisateur(50));
    return etudiant;
  }

  private Particulier createParticulier() {
    Particulier particulier = new Particulier();
    particulier.setNom("Bernard");
    particulier.setPrenom("Luc");
    particulier.setEmail("luc.bernard@gmail.com");
    particulier.setTelephone("+33 1 98 76 54 32");
    particulier.setAdresse("5 boulevard Voltaire, Paris");
    particulier.setDateInscription(LocalDate.of(2023, 3, 20));
    particulier.setMotDePasse("password123");
    particulier.setProfession("Consultant");
    particulier.setCompte(new CompteUtilisateur(100));
    return particulier;
  }
}
