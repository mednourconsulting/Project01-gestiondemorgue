package com.akveo.bundlejava.service;

import com.akveo.bundlejava.model.ApercuCorps;
import com.akveo.bundlejava.repository.ApercuCorpsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class ApercuCorpService {
    @Autowired
    ApercuCorpsRepository apercuCorpsRepository;

    public List<ApercuCorps> findByMedecinId(Long id){
        return apercuCorpsRepository.findByMedecinId(id);
    }
    public List<ApercuCorps> findByDefuntId(Long id){
        return apercuCorpsRepository.findByDefuntId(id);
    }

    public ResponseEntity<ApercuCorps> delete(Long id) {
        ApercuCorps apercuCorps = apercuCorpsRepository.findById(id).get();
        if (apercuCorps == null) {
            ResponseEntity.notFound();
        }
        apercuCorpsRepository.deleteById(id);
        return ResponseEntity.ok(apercuCorps);
    }

    public ApercuCorps getById(Long id) {
        return this.apercuCorpsRepository.getById(id);
    }

    public List<ApercuCorps> getAll() {
        return this.apercuCorpsRepository.findAll();
    }

    public ApercuCorps update(ApercuCorps apercuCorps) {
        return this.apercuCorpsRepository.save(apercuCorps);
    }

    public ApercuCorps create( ApercuCorps apercuCorps) {
        return this.apercuCorpsRepository.save(apercuCorps);
    }
}
