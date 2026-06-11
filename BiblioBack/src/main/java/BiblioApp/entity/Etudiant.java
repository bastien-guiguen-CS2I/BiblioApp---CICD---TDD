package BiblioApp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("ETUDIANT")
public class Etudiant extends Utilisateur {

  @Column(nullable = true)
  private String anneeUniversitaire;

  @Column(nullable = true)
  private String numeroEtudiant;

  public String getAnneeUniversitaire() {
    return anneeUniversitaire;
  }

  public void setAnneeUniversitaire(String anneeUniversitaire) {
    this.anneeUniversitaire = anneeUniversitaire;
  }

  public String getNumeroEtudiant() {
    return numeroEtudiant;
  }

  public void setNumeroEtudiant(String numeroEtudiant) {
    this.numeroEtudiant = numeroEtudiant;
  }
}
