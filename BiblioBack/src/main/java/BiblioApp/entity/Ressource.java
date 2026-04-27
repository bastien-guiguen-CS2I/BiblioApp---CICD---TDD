package BiblioApp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "ressource")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type_ressource", discriminatorType = DiscriminatorType.STRING)
public abstract class Ressource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String titre;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private Integer emplacementId;

    @Column(nullable = false)
    private Integer caution;

    @Column(nullable = true)
    private String localisation;

    @Column(nullable = true)
    private LocalDate datePublication;

    public Ressource() {
    }

    public Ressource(String titre, String type, Integer emplacementId, Integer caution, String localisation,
            LocalDate datePublication) {
        this.titre = titre;
        this.type = type;
        this.emplacementId = emplacementId;
        this.caution = caution;
        this.localisation = localisation;
        this.datePublication = datePublication;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getEmplacementId() {
        return emplacementId;
    }

    public void setEmplacementId(Integer emplacementId) {
        this.emplacementId = emplacementId;
    }

    public Integer getCaution() {
        return caution;
    }

    public void setCaution(Integer caution) {
        this.caution = caution;
    }

    public String getLocalisation() {
        return localisation;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }

    public LocalDate getDatePublication() {
        return datePublication;
    }

    public void setDatePublication(LocalDate datePublication) {
        this.datePublication = datePublication;
    }
}
