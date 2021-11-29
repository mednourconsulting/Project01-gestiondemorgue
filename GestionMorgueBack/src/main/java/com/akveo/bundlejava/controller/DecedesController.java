package com.akveo.bundlejava.controller;


import com.akveo.bundlejava.model.Decedes;

import com.akveo.bundlejava.service.DecedesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"api/decedes"})
public class DecedesController {

    @Autowired
    private DecedesService decedesService;

    @PostMapping({"/create"})
    public ResponseEntity<Decedes> create(@RequestBody Decedes decedes) {
        return ResponseEntity.ok(decedesService.create(decedes));
    }

    @PutMapping({"/update"})
    public ResponseEntity<Decedes> update(@RequestBody Decedes decedes) {
        return ResponseEntity.ok(this.decedesService.update(decedes));
    }
    @GetMapping({"/getBySexeEquals/{sexe}"})
    public ResponseEntity<Decedes> getBySexeEquals(@PathVariable("sexe") String sexe) {
        return ResponseEntity.ok(this.decedesService.getBySexeEquals(sexe));
    }

    @GetMapping({"/getByNom/{nom}"})
    public ResponseEntity<Decedes> getByNom(@PathVariable("nom") String nom) {
        return ResponseEntity.ok(this.decedesService.getByNom(nom));
    }
    @GetMapping({"/getByNumRegister/{numRegester}"})
    public ResponseEntity<Decedes> getByNumRegister(@PathVariable("numRegester") Long numRegester) {
        return ResponseEntity.ok(this.decedesService.getByNumRegister(numRegester));
    }

    @GetMapping({"/getById/{id}"})
    public ResponseEntity<Decedes> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.decedesService.getById(id));
    }

    @GetMapping({"/getAll"})
    public ResponseEntity<List<Decedes>> getAll() {
        return ResponseEntity.ok(this.decedesService.getAll());
    }

    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity<Decedes> delete(@PathVariable("id") Long id) {
       return this.decedesService.delete(id);

    }

    @PutMapping("/defineRegisterNumber")
    public ResponseEntity<Decedes> defineRegisterNumber(@RequestBody Decedes decede) {
        return ResponseEntity.ok(this.decedesService.defineRegisterNumber(decede));
    }
}
