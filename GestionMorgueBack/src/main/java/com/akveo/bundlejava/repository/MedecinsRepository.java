package com.akveo.bundlejava.repository;
import com.akveo.bundlejava.model.Medecins;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedecinsRepository extends JpaRepository<Medecins, Long> {
    Medecins getById(Long id);
    Medecins getByNom(String nom);
}
