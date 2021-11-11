package com.akveo.bundlejava.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class Medecins implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nom;
    private String prenom;
    private String adress;
    private String cin;
    private String nomAR;
    private String prenomAR;
    private String adressAR;

    public Medecins() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getNomAR() {
        return nomAR;
    }

    public void setNomAR(String nomAR) {
        this.nomAR = nomAR;
    }

    public String getPrenomAR() {
        return prenomAR;
    }

    public void setPrenomAR(String prenomAR) {
        this.prenomAR = prenomAR;
    }

    public String getAdressAR() {
        return adressAR;
    }

    public void setAdressAR(String adressAR) {
        this.adressAR = adressAR;
    }
}
