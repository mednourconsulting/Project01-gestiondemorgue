package com.akveo.bundlejava.repository;

import com.akveo.bundlejava.model.Bulletins;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BulletinsRepository extends JpaRepository<Bulletins, Long> {
}
