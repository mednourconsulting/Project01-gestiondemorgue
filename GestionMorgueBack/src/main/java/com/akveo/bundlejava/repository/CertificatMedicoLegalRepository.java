package com.akveo.bundlejava.repository;

import com.akveo.bundlejava.model.CertificatMedicoLegal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificatMedicoLegalRepository extends JpaRepository<CertificatMedicoLegal, Long> {
    List<CertificatMedicoLegal> findByMedecinId(Long id);
    List<CertificatMedicoLegal> findByDefuntId(Long id);


}
