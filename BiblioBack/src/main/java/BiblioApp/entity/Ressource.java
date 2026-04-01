package BiblioApp.entity;

import jakarta.persistence.*;

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

    public Ressource() {
    }

    public Ressource(String titre, String type, Integer emplacementId) {
        this.titre = titre;
        this.type = type;
        this.emplacementId = emplacementId;
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
}
