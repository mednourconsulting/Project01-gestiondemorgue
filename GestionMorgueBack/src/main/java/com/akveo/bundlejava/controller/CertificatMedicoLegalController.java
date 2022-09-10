package com.akveo.bundlejava.controller;

import com.akveo.bundlejava.model.CertificatMedicoLegal;
import com.akveo.bundlejava.repository.CertificatMedicoLegalRepository;
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
@RequestMapping({"api/certificatMedicoLegal"})
public class CertificatMedicoLegalController {
    @Autowired
    private CertificatMedicoLegalRepository certificatMedicoLegalRepository;

    public CertificatMedicoLegalController() {
    }

    @PostMapping({"/create"})
    public ResponseEntity<CertificatMedicoLegal> create(@RequestBody CertificatMedicoLegal certificatMedicoLegal) {
        return ResponseEntity.ok(this.certificatMedicoLegalRepository.save(certificatMedicoLegal));
    }

    @PutMapping({"/update"})
    public ResponseEntity<CertificatMedicoLegal> update(@RequestBody CertificatMedicoLegal certificatMedicoLegal) {
        return ResponseEntity.ok(this.certificatMedicoLegalRepository.save(certificatMedicoLegal));
    }

    @GetMapping({"/getAll"})
    public ResponseEntity<List<CertificatMedicoLegal>> getAll() {
        return ResponseEntity.ok(this.certificatMedicoLegalRepository.findAll());
    }

    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity<CertificatMedicoLegal> delete(@PathVariable("id") Long id) {
        CertificatMedicoLegal certificatMedicoLegal = certificatMedicoLegalRepository.findById(id).get();
        if (certificatMedicoLegal == null) {
            ResponseEntity.notFound();
        }
        certificatMedicoLegalRepository.deleteById(id);
        return ResponseEntity.ok(certificatMedicoLegal);

    }
}
