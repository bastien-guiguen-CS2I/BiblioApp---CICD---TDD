package BiblioApp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.time.LocalDate;

@Entity
@DiscriminatorValue("REVUE")
public class Revue extends Ressource {

    @Column(nullable = true)
    private Integer numeroVolume;

    public Revue() {
    }

    public Revue(String titre, String type, Integer emplacementId, Integer caution, String localisation,
            LocalDate datePublication, Integer numeroVolume) {
        super(titre, type, emplacementId, caution, localisation, datePublication);
        this.numeroVolume = numeroVolume;
    }

    public Integer getNumeroVolume() {
        return numeroVolume;
    }

    public void setNumeroVolume(Integer numeroVolume) {
        this.numeroVolume = numeroVolume;
    }
}
