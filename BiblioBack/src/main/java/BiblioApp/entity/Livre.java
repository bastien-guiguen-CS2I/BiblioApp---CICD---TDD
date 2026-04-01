package BiblioApp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("LIVRE")
public class Livre extends Ressource {

    @Column(nullable = true)
    private String auteur;

    @Column(nullable = true)
    private String codeISBN;

    public Livre() {
    }

    public Livre(String titre, String type, Integer emplacementId, String auteur, String codeISBN) {
        super(titre, type, emplacementId);
        this.auteur = auteur;
        this.codeISBN = codeISBN;
    }

    public String getAuteur() {
        return auteur;
    }

    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public String getCodeISBN() {
        return codeISBN;
    }

    public void setCodeISBN(String codeISBN) {
        this.codeISBN = codeISBN;
    }
}
