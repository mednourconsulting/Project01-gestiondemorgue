
package com.akveo.bundlejava.model;

import javax.persistence.OneToOne;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import java.io.Serializable;
import java.util.Date;

@Entity
public class CertificatMedicoLegal implements Serializable {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;
    @OneToOne
    private Medecins medecin;
    private String declarant;
    private String address;
    private String cin;
    private Date declaration;
    @OneToOne
    private Decedes defunt;

    public CertificatMedicoLegal() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Medecins getMedecin() {
        return medecin;
    }

    public void setMedecin(Medecins medecin) {
        this.medecin = medecin;
    }

    public String getDeclarant() {
        return declarant;
    }

    public void setDeclarant(String declarant) {
        this.declarant = declarant;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public Date getDeclaration() {
        return declaration;
    }

    public void setDeclaration(Date declaration) {
        this.declaration = declaration;
    }

    public Decedes getDefunt() {
        return defunt;
    }

    public void setDefunt(Decedes defunt) {
        this.defunt = defunt;
    }
}
