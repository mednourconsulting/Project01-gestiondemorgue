package com.akveo.bundlejava.controller;


import com.akveo.bundlejava.model.CertificatEnterrement;
import com.akveo.bundlejava.repository.CertificatEnterrementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin({"*"})
@RequestMapping({"api/certificatEnterrement"})
public class CertificatEnterrementController {
    @Autowired
    private CertificatEnterrementRepository certificatEnterrementRepository;

    public CertificatEnterrementController() {
    }

    @PostMapping({"/create"})
    public ResponseEntity<CertificatEnterrement> create(@RequestBody CertificatEnterrement certificatEnterrement) {
        return ResponseEntity.ok(this.certificatEnterrementRepository.save(certificatEnterrement));
    }

    @PutMapping({"/update"})
    public ResponseEntity<CertificatEnterrement> update(@RequestBody CertificatEnterrement certificatEnterrement) {
        return ResponseEntity.ok(this.certificatEnterrementRepository.save(certificatEnterrement));
    }

    @GetMapping({"/getAll"})
    public ResponseEntity<List<CertificatEnterrement>> getAll() {
        return ResponseEntity.ok(this.certificatEnterrementRepository.findAll());
    }

    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity<CertificatEnterrement> delete(@PathVariable("id") Long id) {
        CertificatEnterrement certificatEnterrement = certificatEnterrementRepository.findById(id).get();
        if (certificatEnterrement == null) {
            ResponseEntity.notFound();
        }
        certificatEnterrementRepository.deleteById(id);
        return ResponseEntity.ok(certificatEnterrement);

    }
}
