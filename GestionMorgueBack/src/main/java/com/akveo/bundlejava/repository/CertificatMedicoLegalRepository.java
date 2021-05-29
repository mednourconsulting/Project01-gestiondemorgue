package com.akveo.bundlejava.repository;

import com.akveo.bundlejava.model.CertificatMedicoLegal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificatMedicoLegalRepository extends JpaRepository<CertificatMedicoLegal, Long> {

}
