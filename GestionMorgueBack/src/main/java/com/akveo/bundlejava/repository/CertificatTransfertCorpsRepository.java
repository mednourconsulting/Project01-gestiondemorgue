package com.akveo.bundlejava.repository;

import com.akveo.bundlejava.model.CertificatTransfertCorps;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificatTransfertCorpsRepository extends JpaRepository<CertificatTransfertCorps, Long> {

}
