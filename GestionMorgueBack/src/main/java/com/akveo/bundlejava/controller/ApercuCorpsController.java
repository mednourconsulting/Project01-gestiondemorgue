package com.akveo.bundlejava.controller;

import com.akveo.bundlejava.model.ApercuCorps;
import com.akveo.bundlejava.repository.ApercuCorpsRepository;
import com.akveo.bundlejava.service.ApercuCorpService;
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
@RequestMapping({"api/apercuCorps"})
public class ApercuCorpsController {

    @Autowired
    private ApercuCorpService apercuCorpService;


    @PostMapping({"/create"})
    public ResponseEntity<ApercuCorps> create(@RequestBody ApercuCorps apercuCorps) {
        return ResponseEntity.ok(this.apercuCorpService.create(apercuCorps));
    }

    @PutMapping({"/update"})
    public ResponseEntity<ApercuCorps> update(@RequestBody ApercuCorps apercuCorps) {
        return ResponseEntity.ok(this.apercuCorpService.update(apercuCorps));
    }

    @GetMapping({"/getAll"})
    public ResponseEntity<List<ApercuCorps>> getAll() {
        return ResponseEntity.ok(this.apercuCorpService.getAll());
    }

    @GetMapping({"/getById/{id}"})
    public ResponseEntity<ApercuCorps> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.apercuCorpService.getById(id));
    }

    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity<ApercuCorps> delete(@PathVariable("id") Long id) {
        return apercuCorpService.delete(id);
    }

    @GetMapping({"/getByMedecinId/{id}"})
    public List<ApercuCorps> findByMedecinId(@PathVariable("id") Long id) {
        return apercuCorpService.findByMedecinId(id);
    }
    @GetMapping({"/getByDefuntId/{id}"})
    public List<ApercuCorps> findByDefuntId(@PathVariable("id") Long id) {
        return apercuCorpService.findByDefuntId(id);
    }
}
