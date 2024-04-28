package com.incorp.managment.repository;

import com.incorp.managment.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    List<Admin> findAll();

    @Query("SELECT a FROM Admin a WHERE a.email =:email")
    Optional<Admin> findByEmail(String email);
}
