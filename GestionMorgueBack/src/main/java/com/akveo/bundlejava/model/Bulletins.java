package com.akveo.bundlejava.model;

import javax.persistence.GenerationType;
import javax.persistence.OneToOne;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Bulletins implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String typeBulletin;
    private Date declaration = new Date();
    private String cercle;
    private String diagnostique;
    private String lieuEntrement;
    private String province;
    private String residece;
    private String cimetiere;
    private long numTombe;
    private String centre;
    private String compostage;
    @OneToOne
    private Medecins medecin;
    @OneToOne
    private Decedes  decede;

    public String getCompostage() {
        return compostage;
    }

    public void setCompostage(String compostage) {
        this.compostage = compostage;
    }

    public Medecins getMedecin() {
        return medecin;
    }

    public void setMedecin(Medecins medecin) {
        this.medecin = medecin;
    }

    public Decedes getDecede() {
        return decede;
    }

    public void setDecede(Decedes decede) {
        this.decede = decede;
    }

    public Bulletins() {
    }

    public String getCentre() {
        return centre;
    }

    public void setCentre(String centre) {
        this.centre = centre;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTypeBulletin() {
        return typeBulletin;
    }

    public void setTypeBulletin(String typeBulletin) {
        this.typeBulletin = typeBulletin;
    }

    public Date getDeclaration() {
        return declaration;
    }

    public void setDeclaration(Date declaration) {
        this.declaration = declaration;
    }

    public String getCercle() {
        return cercle;
    }

    public void setCercle(String cercle) {
        this.cercle = cercle;
    }

    public String getDiagnostique() {
        return diagnostique;
    }

    public void setDiagnostique(String diagnostique) {
        this.diagnostique = diagnostique;
    }

    public String getLieuEntrement() {
        return lieuEntrement;
    }

    public void setLieuEntrement(String lieuEntrement) {
        this.lieuEntrement = lieuEntrement;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getResidece() {
        return residece;
    }

    public void setResidece(String residece) {
        this.residece = residece;
    }

    public String getCimetiere() {
        return cimetiere;
    }

    public void setCimetiere(String cimetiere) {
        this.cimetiere = cimetiere;
    }

    public long getNumTombe() {
        return numTombe;
    }

    public void setNumTombe(long numTombe) {
        this.numTombe = numTombe;
    }
}
