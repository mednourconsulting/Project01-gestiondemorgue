package com.akveo.bundlejava.repository;

import com.akveo.bundlejava.model.CertificatEnterrement;
import com.akveo.bundlejava.model.Decedes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificatEnterrementRepository extends JpaRepository<CertificatEnterrement, Long> {
    List<CertificatEnterrement> findAllByDefunt(Decedes decedes);
}
