package com.akveo.bundlejava.model;


import javax.persistence.GenerationType;
import javax.persistence.OneToOne;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

@Entity
public class ApercuCorps implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @OneToOne
    private Decedes defunt;
    private String centerMedicoLegal;
    @OneToOne
    private Medecins medecin;
    private Date dateDeclaration;

    public Decedes getDefunt() {
        return defunt;
    }

    public void setDefunt(Decedes defunt) {
        this.defunt = defunt;
    }

    public ApercuCorps() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCenterMedicoLegal() {
        return centerMedicoLegal;
    }

    public void setCenterMedicoLegal(String centerMedicoLegal) {
        this.centerMedicoLegal = centerMedicoLegal;
    }

    public Medecins getMedecin() {
        return medecin;
    }

    public void setMedecin(Medecins medecin) {
        this.medecin = medecin;
    }

    public Date getDateDeclaration() {
        return dateDeclaration;
    }

    public void setDateDeclaration(Date dateDeclaration) {
        this.dateDeclaration = dateDeclaration;
    }
}
