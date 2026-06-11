package BiblioApp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("ENSEIGNANT")
public class Enseignant extends Utilisateur {

  @Column(nullable = true)
  private String nomDepartement;

  @Column(nullable = true)
  private String grade;

  public String getNomDepartement() {
    return nomDepartement;
  }

  public void setNomDepartement(String nomDepartement) {
    this.nomDepartement = nomDepartement;
  }

  public String getGrade() {
    return grade;
  }

  public void setGrade(String grade) {
    this.grade = grade;
  }
}
