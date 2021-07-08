package com.akveo.bundlejava.repository;

import com.akveo.bundlejava.model.Decedes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DecedesRepository extends JpaRepository<Decedes, Long> {
    Decedes getById(Long id);
    Decedes getByNom(String nom);
    Decedes getBySexeEquals(String sexe);
    Decedes getByNumRegister(Long numRegester);
}
