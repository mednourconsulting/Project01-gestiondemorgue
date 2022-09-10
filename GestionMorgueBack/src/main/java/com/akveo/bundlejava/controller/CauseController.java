package com.akveo.bundlejava.controller;

import com.akveo.bundlejava.model.Cause;
import com.akveo.bundlejava.repository.CauseRepository;

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
@RequestMapping({"api/cause"})
public class CauseController {
    @Autowired
    private CauseRepository causeRepository;

    public CauseController() {
    }



    @PostMapping({"/create"})
    public ResponseEntity<Cause> create(@RequestBody Cause cause) {
        return ResponseEntity.ok(this.causeRepository.save(cause));
    }

    @PutMapping({"/update"})
    public ResponseEntity<Cause> update(@RequestBody Cause cause) {
        return ResponseEntity.ok(this.causeRepository.save(cause));
    }

    @GetMapping({"/getByCode/{code}"})
    public ResponseEntity<Cause> getByCode(@PathVariable("code")String code) {
        return ResponseEntity.ok(this.causeRepository.getByCode(code));
    }
    @GetMapping({"/getById/{id}"})
    public ResponseEntity<Cause> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.causeRepository.getById(id));
    }
    @GetMapping({"/getByDescription/{descripton}"})
    public ResponseEntity<Cause> getByDescription(@PathVariable("descripton") String descripton) {
        return ResponseEntity.ok(this.causeRepository.getByDescription(descripton));
    }

    @GetMapping({"/getAll"})
    public ResponseEntity<List<Cause>> getAll() {
        return ResponseEntity.ok(this.causeRepository.findAll());
    }

    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity<Cause> delete(@PathVariable("id") Long id) {
        Cause cause = causeRepository.findById(id).get();
        if (cause == null) {
            ResponseEntity.notFound();
        }
        causeRepository.deleteById(id);
        return ResponseEntity.ok(cause);

    }
}
