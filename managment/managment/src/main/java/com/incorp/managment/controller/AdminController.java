package com.incorp.managment.controller;

import com.incorp.managment.model.Admin;
import com.incorp.managment.repository.AdminRepository;
import com.incorp.managment.service.admin.AdminService;
import com.incorp.managment.service.admin.autenticacao.AdminTokenDto;
import com.incorp.managment.service.admin.dto.AdminLoginDto;
import com.incorp.managment.service.admin.dto.CriarAdminDto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminRepository adminRepository;

    @GetMapping
    public List<Admin> todos(){
        return adminRepository.findAll();
    }

    @PostMapping
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Void> criar(@RequestBody @Valid CriarAdminDto adminCriacaoDto) {
        this.adminService.criar(adminCriacaoDto);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/login")
    public ResponseEntity<AdminTokenDto> login(@RequestBody AdminLoginDto adminLoginDto) {
        AdminTokenDto adminTokenDto = this.adminService.autenticar(adminLoginDto);

        return ResponseEntity.status(200).body(adminTokenDto);
    }
}
