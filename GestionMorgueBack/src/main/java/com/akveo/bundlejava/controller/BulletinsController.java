package com.akveo.bundlejava.controller;

import com.akveo.bundlejava.model.Bulletins;

import com.akveo.bundlejava.repository.BulletinsRepository;

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
@RequestMapping({"api/Bulletins"})
public class BulletinsController {
    @Autowired
    private BulletinsRepository bulletinsRepository;

    public BulletinsController() {
    }

    @PostMapping({"/create"})
    public ResponseEntity<Bulletins> create(@RequestBody Bulletins bulletins) {
        return ResponseEntity.ok(this.bulletinsRepository.save(bulletins));
    }

    @PutMapping({"/update"})
    public ResponseEntity<Bulletins> update(@RequestBody Bulletins bulletinsId) {
        Bulletins bulletins = bulletinsId;

        bulletins.setMedecin(bulletinsId.getMedecin());
        bulletins.setDecede(bulletinsId.getDecede());
        return ResponseEntity.ok(this.bulletinsRepository.save(bulletins));
    }

    @GetMapping({"/getAll"})
    public ResponseEntity<List<Bulletins>> getAll() {
        return ResponseEntity.ok(this.bulletinsRepository.findAll());
    }

    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity<Bulletins> delete(@PathVariable("id") Long id) {
        Bulletins bulletins = bulletinsRepository.findById(id).get();
        if (bulletins == null) {
            ResponseEntity.notFound();
        }
        bulletinsRepository.deleteById(id);
        return ResponseEntity.ok(bulletins);

    }
}
