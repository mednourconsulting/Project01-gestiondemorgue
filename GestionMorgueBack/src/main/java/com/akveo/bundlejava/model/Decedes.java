package com.akveo.bundlejava.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import java.io.Serializable;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}

