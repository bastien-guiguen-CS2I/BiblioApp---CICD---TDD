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

    @Column(nullable = true)
    private LocalDate dateParution;

    public Revue() {
    }

    public Revue(String titre, String type, Integer emplacementId, Integer numeroVolume, LocalDate dateParution) {
        super(titre, type, emplacementId);
        this.numeroVolume = numeroVolume;
        this.dateParution = dateParution;
    }

    public Integer getNumeroVolume() {
        return numeroVolume;
    }

    public void setNumeroVolume(Integer numeroVolume) {
        this.numeroVolume = numeroVolume;
    }

    public LocalDate getDateParution() {
        return dateParution;
    }

    public void setDateParution(LocalDate dateParution) {
        this.dateParution = dateParution;
    }
}
