package com.akveo.bundlejava.service;

import com.akveo.bundlejava.model.Medecins;
import com.akveo.bundlejava.repository.MedecinsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedecinsService {

    @Autowired
    MedecinsRepository medecinsRepository;
    @Autowired
    private CertificatTransfertCorpsService transfertCorpsService;
    @Autowired
    private BulletinsService bulletinsService;
    @Autowired
    private ApercuCorpService apercuCorpService;
    @Autowired
    private CertificatMedicoLegalService medicoLegalService;

    public Medecins create( Medecins medecins) {
        return this.medecinsRepository.save(medecins);
    }
    public Medecins update(Medecins medecins) {
        return this.medecinsRepository.save(medecins);
    }
    public Medecins getById( Long id) {
        return this.medecinsRepository.getById(id);
    }
    public Medecins getByNom(String nom) {
        return this.medecinsRepository.getByNom(nom);
    }
    public List<Medecins> getAll() {
        return this.medecinsRepository.findAll();
    }
    public ResponseEntity<Medecins> delete( Long id) {
        Medecins medecins = medecinsRepository.findById(id).get();
        if (medecins == null) {
            ResponseEntity.notFound();
        }else if (this.medicoLegalService.findByMedecinId(id).isEmpty() &&
                this.apercuCorpService.findByMedecinId(id).isEmpty() &&
                this.bulletinsService.findByMedecinId(id).isEmpty() &&
                this.transfertCorpsService.findByMedecinsId(id).isEmpty()) {
            this.medecinsRepository.delete(medecins);
            return ResponseEntity.ok(medecins);
        }else {
            medecins = null;
        }
        return ResponseEntity.ok(medecins);

    }
}
