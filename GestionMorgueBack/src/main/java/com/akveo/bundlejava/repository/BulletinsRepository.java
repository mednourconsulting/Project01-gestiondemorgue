package com.akveo.bundlejava.repository;

import com.akveo.bundlejava.model.Bulletins;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BulletinsRepository extends JpaRepository<Bulletins, Long> {
    List<Bulletins> findByMedecinId(Long id);
    List<Bulletins> findByDecedeId(Long id);

}
