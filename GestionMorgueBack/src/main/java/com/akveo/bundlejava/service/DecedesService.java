package com.akveo.bundlejava.service;

import com.akveo.bundlejava.model.Decedes;
import com.akveo.bundlejava.repository.DecedesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DecedesService {
    @Autowired
    DecedesRepository decedesRepository;
    @Autowired
    CertificatMedicoLegalService medicoLegalService;
    @Autowired
    ApercuCorpService apercuCorpService;
    @Autowired
    BulletinsService bulletinsService;
    @Autowired
    CertificatTransfertCorpsService transfertCorpsService;

    public Decedes create( Decedes decedes) {

        return decedesRepository.save(decedes);
    }
    public Decedes update( Decedes decedes) {

        return this.decedesRepository.save(decedes);
    }
    public Decedes getBySexeEquals( String sexe) {
        return this.decedesRepository.getBySexeEquals(sexe);
    }
    public Decedes getByNom(String nom) {
        return this.decedesRepository.getByNom(nom);
    }
    public Decedes getByNumRegister( Long numRegester) {
        return this.decedesRepository.getByNumRegister(numRegester);
    }
    public Decedes getById(Long id) {
        return this.decedesRepository.getById(id);
    }
    public List<Decedes> getAll() {
        return this.decedesRepository.findAll();
    }
    public ResponseEntity<Decedes> delete(Long id) {
        Decedes decedes = decedesRepository.findById(id).get();
        if (decedes == null) {
            ResponseEntity.notFound();
        }else if (this.medicoLegalService.findByDefuntId(id).isEmpty() &&
                this.apercuCorpService.findByDefuntId(id).isEmpty() &&
                this.bulletinsService.findByDecedeId(id).isEmpty() &&
                this.transfertCorpsService.findByDefuntId(id).isEmpty()) {
                this.decedesRepository.delete(decedes);
                return ResponseEntity.ok(decedes);
        }else {
           decedes = null;
        }
        return ResponseEntity.ok(decedes);

    }

    public Decedes defineRegisterNumber(Decedes decede) {
        Optional<Decedes> decedes = decedesRepository.findById(decede.getId());
       if (decedes.isPresent()) {
           Decedes founded =  decedes.get();
           String  num ="DC00" + decede.getId();
                  founded.setNumRegister(num);
           this.decedesRepository.save(founded);
           return founded;
       }else {
           return null;
       }
    }
}
