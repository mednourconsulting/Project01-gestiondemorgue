package com.akveo.bundlejava.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import java.io.Serializable;
import java.util.Date;
@Entity
public class Decedes implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nomAR;
    private String prenomAR;
    private String adresseAR;
    private String lieuNaiss;
    private String lieuDecesAR;
    private String nationaliteAR;
    private String filsAR;
    private String cin;
    private String heure;
    private String prenom;
    private String nom;
    private String sexe;
    private Date dateNaissance;
    private String adresse;
    private String nationalite;
    private String fils;
    private Boolean mortNe;
    private String profession;
    private Date dateDeces;
    private String natureMort;
    private String causeMort;
    private String provinceD;
    private String prefectureD;
    private String communeD;
    private String causeInitial;
    private String causeImmdiate;
    private String lieuxDeces;
    private String etat;
    private boolean obstacle;
    private String numRegister;
    private String autopsie;
    private String operation;
    private String ageMere;
    private String ageGestationnel;
    private String grossesseMultiple;
    private String poidsNaissance;
    private String decesGrossesse;
    private String decesFemme;
    private String contribueGros;
    private String maladie;
    private Date dateServ;
    private String lieuServ;
    private String circonServ;
    private String resultatsAutopsie;
    private Date dateOperation;
    private String motifOperation;

    public Decedes() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getAdresseAR() {
        return adresseAR;
    }

    public void setAdresseAR(String adresseAR) {
        this.adresseAR = adresseAR;
    }

    public String getLieuNaiss() {
        return lieuNaiss;
    }

    public void setLieuNaiss(String lieuNaiss) {
        this.lieuNaiss = lieuNaiss;
    }

    public String getLieuDecesAR() {
        return lieuDecesAR;
    }

    public void setLieuDecesAR(String lieuDecesAR) {
        this.lieuDecesAR = lieuDecesAR;
    }

    public String getNationaliteAR() {
        return nationaliteAR;
    }

    public void setNationaliteAR(String nationaliteAR) {
        this.nationaliteAR = nationaliteAR;
    }

    public String getFilsAR() {
        return filsAR;
    }

    public void setFilsAR(String filsAR) {
        this.filsAR = filsAR;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getHeure() {
        return heure;
    }

    public void setHeure(String heure) {
        this.heure = heure;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getNationalite() {
        return nationalite;
    }

    public void setNationalite(String nationalite) {
        this.nationalite = nationalite;
    }

    public String getFils() {
        return fils;
    }

    public void setFils(String fils) {
        this.fils = fils;
    }

    public Boolean getMortNe() {
        return mortNe;
    }

    public void setMortNe(Boolean mortNe) {
        this.mortNe = mortNe;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public Date getDateDeces() {
        return dateDeces;
    }

    public void setDateDeces(Date dateDeces) {
        this.dateDeces = dateDeces;
    }

    public String getNatureMort() {
        return natureMort;
    }

    public void setNatureMort(String natureMort) {
        this.natureMort = natureMort;
    }

    public String getCauseMort() {
        return causeMort;
    }

    public void setCauseMort(String causeMort) {
        this.causeMort = causeMort;
    }

    public String getProvinceD() {
        return provinceD;
    }

    public void setProvinceD(String provinceD) {
        this.provinceD = provinceD;
    }

    public String getPrefectureD() {
        return prefectureD;
    }

    public void setPrefectureD(String prefectureD) {
        this.prefectureD = prefectureD;
    }

    public String getCommuneD() {
        return communeD;
    }

    public void setCommuneD(String communeD) {
        this.communeD = communeD;
    }

    public String getCauseInitial() {
        return causeInitial;
    }

    public void setCauseInitial(String causeInitial) {
        this.causeInitial = causeInitial;
    }

    public String getCauseImmdiate() {
        return causeImmdiate;
    }

    public void setCauseImmdiate(String causeImmdiate) {
        this.causeImmdiate = causeImmdiate;
    }

    public String getLieuxDeces() {
        return lieuxDeces;
    }

    public void setLieuxDeces(String lieuxDeces) {
        this.lieuxDeces = lieuxDeces;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public boolean isObstacle() {
        return obstacle;
    }

    public void setObstacle(boolean obstacle) {
        this.obstacle = obstacle;
    }

    public String getNumRegister() {
        return numRegister;
    }

    public void setNumRegister(String numRegister) {
        this.numRegister = numRegister;
    }

    public String getAutopsie() {
        return autopsie;
    }

    public void setAutopsie(String autopsie) {
        this.autopsie = autopsie;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getAgeMere() {
        return ageMere;
    }

    public void setAgeMere(String ageMere) {
        this.ageMere = ageMere;
    }

    public String getAgeGestationnel() {
        return ageGestationnel;
    }

    public void setAgeGestationnel(String ageGestationnel) {
        this.ageGestationnel = ageGestationnel;
    }

    public String getGrossesseMultiple() {
        return grossesseMultiple;
    }

    public void setGrossesseMultiple(String grossesseMultiple) {
        this.grossesseMultiple = grossesseMultiple;
    }

    public String getPoidsNaissance() {
        return poidsNaissance;
    }

    public void setPoidsNaissance(String poidsNaissance) {
        this.poidsNaissance = poidsNaissance;
    }

    public String getDecesGrossesse() {
        return decesGrossesse;
    }

    public void setDecesGrossesse(String decesGrossesse) {
        this.decesGrossesse = decesGrossesse;
    }

    public String getDecesFemme() {
        return decesFemme;
    }

    public void setDecesFemme(String decesFemme) {
        this.decesFemme = decesFemme;
    }

    public String getContribueGros() {
        return contribueGros;
    }

    public void setContribueGros(String contribueGros) {
        this.contribueGros = contribueGros;
    }

    public String getMaladie() {
        return maladie;
    }

    public void setMaladie(String maladie) {
        this.maladie = maladie;
    }

    public Date getDateServ() {
        return dateServ;
    }

    public void setDateServ(Date dateServ) {
        this.dateServ = dateServ;
    }

    public String getLieuServ() {
        return lieuServ;
    }

    public void setLieuServ(String lieuServ) {
        this.lieuServ = lieuServ;
    }

    public String getCirconServ() {
        return circonServ;
    }

    public void setCirconServ(String circonServ) {
        this.circonServ = circonServ;
    }

    public String getResultatsAutopsie() {
        return resultatsAutopsie;
    }

    public void setResultatsAutopsie(String resultatsAutopsie) {
        this.resultatsAutopsie = resultatsAutopsie;
    }

    public Date getDateOperation() {
        return dateOperation;
    }

    public void setDateOperation(Date dateOperation) {
        this.dateOperation = dateOperation;
    }

    public String getMotifOperation() {
        return motifOperation;
    }

    public void setMotifOperation(String motifOperation) {
        this.motifOperation = motifOperation;
    }


}

