package com.akveo.bundlejava.service;

import com.akveo.bundlejava.model.CertificatTransfertCorps;
import com.akveo.bundlejava.repository.CertificatTransfertCorpsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CertificatTransfertCorpsService {

    @Autowired
    CertificatTransfertCorpsRepository transfertCorpsRepository;

    List<CertificatTransfertCorps> findByMedecinsId(Long id) { return this.transfertCorpsRepository.findByMedecinsId(id); }

    List<CertificatTransfertCorps> findByDefuntId(Long id) {
        return this.transfertCorpsRepository.findByDefuntId(id);
    }
}
