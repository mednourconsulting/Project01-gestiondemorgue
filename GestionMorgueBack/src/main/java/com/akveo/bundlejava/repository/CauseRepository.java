package com.akveo.bundlejava.repository;


import com.akveo.bundlejava.model.Cause;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CauseRepository extends JpaRepository<Cause, Long> {
    Cause getByDescription(String desc);
    Cause getByCode(String code);
    Cause getById(Long id);
}
