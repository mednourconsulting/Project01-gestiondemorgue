package com.akveo.bundlejava.repository;

import com.akveo.bundlejava.model.ApercuCorps;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApercuCorpsRepository extends JpaRepository<ApercuCorps, Long> {
    ApercuCorps getById(Long id);
    List<ApercuCorps> findByMedecinId(Long id);
    List<ApercuCorps> findByDefuntId(Long id);
}
