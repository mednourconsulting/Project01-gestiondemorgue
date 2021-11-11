package com.akveo.bundlejava.service;

import com.akveo.bundlejava.model.Bulletins;
import com.akveo.bundlejava.repository.BulletinsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BulletinsService {
    @Autowired
    BulletinsRepository bulletinsRepository;

    List<Bulletins> findByMedecinId(Long id) {
        return bulletinsRepository.findByMedecinId(id);
    }
    List<Bulletins> findByDecedeId(Long id) {
        return bulletinsRepository.findByDecedeId(id);
    }
}
