package com.akveo.bundlejava.controller;

import com.akveo.bundlejava.model.CertificatTransfertCorps;
import com.akveo.bundlejava.repository.CertificatTransfertCorpsRepository;
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
@RequestMapping({"api/certificatTransfertCorps"})
public class CertificatTransfertCorpsController {
    @Autowired
    private CertificatTransfertCorpsRepository certificatTransfertCorpsRepository;

    public CertificatTransfertCorpsController() {
    }

    @PostMapping({"/create"})
    public ResponseEntity<CertificatTransfertCorps> create(
            @RequestBody CertificatTransfertCorps certificatTransfertCorps) {
        return ResponseEntity.ok(this.certificatTransfertCorpsRepository.save(certificatTransfertCorps));
    }

    @PutMapping({"/update"})
    public ResponseEntity<CertificatTransfertCorps> update(
            @RequestBody CertificatTransfertCorps certificatTransfertCorps) {
        return ResponseEntity.ok(this.certificatTransfertCorpsRepository.save(certificatTransfertCorps));
    }

    @GetMapping({"/getAll"})
    public ResponseEntity<List<CertificatTransfertCorps>> getAll() {
        return ResponseEntity.ok(this.certificatTransfertCorpsRepository.findAll());
    }

    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity<CertificatTransfertCorps> delete(@PathVariable("id") Long id) {
        CertificatTransfertCorps certificatTransfertCorps = certificatTransfertCorpsRepository
                .findById(id).get();
        if (certificatTransfertCorps == null) {
            ResponseEntity.notFound();
        }
        certificatTransfertCorpsRepository.deleteById(id);
        return ResponseEntity.ok(certificatTransfertCorps);

    }
}
