package com.akveo.bundlejava.service;

import com.akveo.bundlejava.model.CertificatMedicoLegal;
import com.akveo.bundlejava.repository.CertificatEnterrementRepository;
import com.akveo.bundlejava.repository.CertificatMedicoLegalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificatMedicoLegalService {
    @Autowired
    CertificatMedicoLegalRepository medicoLegalRepository;

    List<CertificatMedicoLegal> findByMedecinId(Long id) {
        return medicoLegalRepository.findByMedecinId(id);
    }
    List<CertificatMedicoLegal> findByDefuntId(Long id) {
        return medicoLegalRepository.findByDefuntId(id);
    }
}
