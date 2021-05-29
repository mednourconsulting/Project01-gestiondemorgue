package com.akveo.bundlejava.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import java.io.Serializable;
import java.util.Date;

@Entity
public class CertificatEnterrement implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String defunt;
    private String ville;
    private Date declaration;

    public CertificatEnterrement() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDefunt() {
        return defunt;
    }

    public void setDefunt(String defunt) {
        this.defunt = defunt;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public Date getDeclaration() {
        return declaration;
    }

    public void setDeclaration(Date declaration) {
        this.declaration = declaration;
    }
}
