package com.akveo.bundlejava.model;

import javax.persistence.OneToOne;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import java.util.Date;

@Entity
public class CertificatTransfertCorps {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @OneToOne
    private Medecins medecins;
    private String cercueilType;
    private Date declaration;
    private String remarque;
    @OneToOne
    private Decedes defunt;
    private String declarant;
    private String tel;
    private String destination;
    private String mortuaire;
    private String inhumationSociete;
    private String cin;

    public CertificatTransfertCorps() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Medecins getMedecins() {
        return medecins;
    }

    public void setMedecins(Medecins medecins) {
        this.medecins = medecins;
    }

    public String getCercueilType() {
        return cercueilType;
    }

    public void setCercueilType(String cercueilType) {
        this.cercueilType = cercueilType;
    }

    public Date getDeclaration() {
        return declaration;
    }

    public void setDeclaration(Date declaration) {
        this.declaration = declaration;
    }

    public String getRemarque() {
        return remarque;
    }

    public void setRemarque(String remarque) {
        this.remarque = remarque;
    }

    public Decedes getDefunt() {
        return defunt;
    }

    public void setDefunt(Decedes defunt) {
        this.defunt = defunt;
    }

    public String getDeclarant() {
        return declarant;
    }

    public void setDeclarant(String declarant) {
        this.declarant = declarant;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getMortuaire() {
        return mortuaire;
    }

    public void setMortuaire(String mortuaire) {
        this.mortuaire = mortuaire;
    }

    public String getInhumationSociete() {
        return inhumationSociete;
    }

    public void setInhumationSociete(String inhumationSociete) {
        this.inhumationSociete = inhumationSociete;
    }
}
