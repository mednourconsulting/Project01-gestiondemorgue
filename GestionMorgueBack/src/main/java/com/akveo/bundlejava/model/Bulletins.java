package com.akveo.bundlejava.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.GenerationType;
import javax.persistence.OneToOne;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}
