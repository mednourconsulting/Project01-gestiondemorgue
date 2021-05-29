package com.akveo.bundlejava.controller;


import com.akveo.bundlejava.model.Decedes;

import com.akveo.bundlejava.repository.DecedesRepository;
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
@RequestMapping({"/decedes"})
public class DecedesController {
    @Autowired
    private DecedesRepository decedesRepository;

    public DecedesController() {
    }

    @PostMapping({"/create"})
    public ResponseEntity<Decedes> create(@RequestBody Decedes decedes) {
        return ResponseEntity.ok(this.decedesRepository.save(decedes));
    }

    @PutMapping({"/update"})
    public ResponseEntity<Decedes> update(@RequestBody Decedes decedes) {
        return ResponseEntity.ok(this.decedesRepository.save(decedes));
    }
    @GetMapping({"/getBySexeEquals/{sexe}"})
    public ResponseEntity<Decedes> getBySexeEquals(@PathVariable("sexe") String sexe) {
        return ResponseEntity.ok(this.decedesRepository.getBySexeEquals(sexe));
    }

    @GetMapping({"/getByNom/{nom}"})
    public ResponseEntity<Decedes> getByNom(@PathVariable("nom") String nom) {
        return ResponseEntity.ok(this.decedesRepository.getByNom(nom));
    }
    @GetMapping({"/getByNumRegister/{numRegester}"})
    public ResponseEntity<Decedes> getByNumRegister(@PathVariable("numRegester") Long numRegester) {
        return ResponseEntity.ok(this.decedesRepository.getByNumRegister(numRegester));
    }

    @GetMapping({"/getById/{id}"})
    public ResponseEntity<Decedes> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.decedesRepository.getById(id));
    }

    @GetMapping({"/getAll"})
    public ResponseEntity<List<Decedes>> getAll() {
        return ResponseEntity.ok(this.decedesRepository.findAll());
    }

    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity<Decedes> delete(@PathVariable("id") Long id) {
        Decedes decedes = decedesRepository.findById(id).get();
        if (decedes == null) {
            ResponseEntity.notFound();
        }
        decedesRepository.deleteById(id);
        return ResponseEntity.ok(decedes);

    }
}
