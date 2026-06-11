package BiblioApp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "compte_utilisateur")
public class CompteUtilisateur {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private Integer soldeDisponible;

  public CompteUtilisateur() {}

  public CompteUtilisateur(Integer soldeDisponible) {
    this.soldeDisponible = soldeDisponible;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getSoldeDisponible() {
    return soldeDisponible;
  }

  public void setSoldeDisponible(Integer soldeDisponible) {
    this.soldeDisponible = soldeDisponible;
  }
}
