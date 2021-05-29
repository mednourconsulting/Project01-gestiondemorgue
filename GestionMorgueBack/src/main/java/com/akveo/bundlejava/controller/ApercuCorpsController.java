package com.akveo.bundlejava.controller;

import com.akveo.bundlejava.model.ApercuCorps;
import com.akveo.bundlejava.repository.ApercuCorpsRepository;
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
@RequestMapping({"/apercuCorps"})
public class ApercuCorpsController {
    @Autowired
    private ApercuCorpsRepository apercuCorpsRepository;

    public ApercuCorpsController() {
    }

    @PostMapping({"/create"})
    public ResponseEntity<ApercuCorps> create(@RequestBody ApercuCorps apercuCorps) {
        return ResponseEntity.ok(this.apercuCorpsRepository.save(apercuCorps));
    }

    @PutMapping({"/update"})
    public ResponseEntity<ApercuCorps> update(@RequestBody ApercuCorps apercuCorps) {
        return ResponseEntity.ok(this.apercuCorpsRepository.save(apercuCorps));
    }

    @GetMapping({"/getAll"})
    public ResponseEntity<List<ApercuCorps>> getAll() {
        return ResponseEntity.ok(this.apercuCorpsRepository.findAll());
    }
    @GetMapping({"/getById/{id}"})
    public ResponseEntity<ApercuCorps> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.apercuCorpsRepository.getById(id));
    }

    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity<ApercuCorps> delete(@PathVariable("id") Long id) {
        ApercuCorps apercuCorps = apercuCorpsRepository.findById(id).get();
        if (apercuCorps == null) {
            ResponseEntity.notFound();
        }
        apercuCorpsRepository.deleteById(id);
        return ResponseEntity.ok(apercuCorps);
    }
}
