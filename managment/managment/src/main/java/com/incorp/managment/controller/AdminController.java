package com.incorp.managment.controller;

import com.incorp.managment.model.Admin;
import com.incorp.managment.repository.AdminRepository;
import com.incorp.managment.responses.LoginResponse;
import com.incorp.managment.service.admin.AdminService;
import com.incorp.managment.service.admin.autenticacao.AdminTokenDto;
import com.incorp.managment.service.admin.dto.AdminLoginDto;
import com.incorp.managment.service.admin.dto.CriarAdminDto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:3333")
@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminRepository adminRepository;

    @GetMapping
    public List<Admin> getAllAdmin(){
        return adminRepository.findAll();
    }

    @PostMapping("/signUp")
    public ResponseEntity<Void> criar(@RequestBody @Valid CriarAdminDto adminCriacaoDto) {
        this.adminService.criar(adminCriacaoDto);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody AdminLoginDto adminLoginDto) {
        AdminTokenDto adminTokenDto = this.adminService.autenticar(adminLoginDto);

        Admin admin = adminRepository.findByEmail(adminLoginDto.getEmail()).get();

        LoginResponse response = new LoginResponse();

        response.setIdAdmin(admin.getIdAdmin());
        response.setNameAdmin(admin.getName());

        return ResponseEntity.ok(response);
    }
}
