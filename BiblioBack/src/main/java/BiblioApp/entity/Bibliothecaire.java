package BiblioApp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("BIBLIOTHECAIRE")
public class Bibliothecaire extends Utilisateur {

  @Column(nullable = true)
  private String numeroEmploye;

  public String getNumeroEmploye() {
    return numeroEmploye;
  }

  public void setNumeroEmploye(String numeroEmploye) {
    this.numeroEmploye = numeroEmploye;
  }
}
