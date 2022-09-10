package com.akveo.bundlejava.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.OneToOne;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

}
