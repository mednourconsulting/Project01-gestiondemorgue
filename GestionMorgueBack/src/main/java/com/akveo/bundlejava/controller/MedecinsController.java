package com.akveo.bundlejava.controller;
import com.akveo.bundlejava.model.Medecins;
import com.akveo.bundlejava.repository.MedecinsRepository;
import com.akveo.bundlejava.service.MedecinsService;
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
@RequestMapping({"api/medicins"})
public class MedecinsController {

    @Autowired
    private MedecinsService medecinService;

    public MedecinsController() {
    }

    @PostMapping({"/create"})
    public ResponseEntity<Medecins> create(@RequestBody Medecins medecins) {
        return ResponseEntity.ok(this.medecinService.create(medecins));
    }

    @PutMapping({"/update"})
    public ResponseEntity<Medecins> update(@RequestBody Medecins medecins) {
        return ResponseEntity.ok(this.medecinService.update(medecins));
    }
    @GetMapping({"/getById/{id}"})
    public ResponseEntity<Medecins> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.medecinService.getById(id));
    }

    @GetMapping({"/getByNom/{Nom}"})
    public ResponseEntity<Medecins> getByNom(@PathVariable("Nom") String nom) {
        return ResponseEntity.ok(this.medecinService.getByNom(nom));
    }

    @GetMapping({"/getAll"})
    public ResponseEntity<List<Medecins>> getAll() {
        return ResponseEntity.ok(this.medecinService.getAll());
    }

    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity<Medecins> delete(@PathVariable("id") Long id) {
        return this.medecinService.delete(id);

    }
}

