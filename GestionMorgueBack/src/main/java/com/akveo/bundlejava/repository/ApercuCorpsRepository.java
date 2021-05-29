package com.akveo.bundlejava.repository;

import com.akveo.bundlejava.model.ApercuCorps;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApercuCorpsRepository extends JpaRepository<ApercuCorps, Long> {
    ApercuCorps getById(Long id);
}
