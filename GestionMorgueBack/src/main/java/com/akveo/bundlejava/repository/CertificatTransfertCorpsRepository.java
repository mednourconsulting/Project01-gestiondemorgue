package com.akveo.bundlejava.repository;

import com.akveo.bundlejava.model.CertificatTransfertCorps;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificatTransfertCorpsRepository extends JpaRepository<CertificatTransfertCorps, Long> {
    List<CertificatTransfertCorps> findByMedecinsId(Long id);
    List<CertificatTransfertCorps> findByDefuntId(Long id);


}
