package com.incorp.managment.service.admin.dto;

import com.incorp.managment.model.Admin;
import com.incorp.managment.service.admin.autenticacao.AdminTokenDto;

public class AdminMapper {

    public static Admin of(CriarAdminDto criarAdminDto){
        Admin admin = new Admin();

        admin.setEmail(criarAdminDto.getEmail());
        admin.setName(criarAdminDto.getNome());
        admin.setPassword(criarAdminDto.getSenha());

        return admin;
    }

    public static AdminTokenDto of(Admin admin, String token){
        AdminTokenDto adminTokenDto = new AdminTokenDto();

        adminTokenDto.setUserId(admin.getId());
        adminTokenDto.setEmail(admin.getEmail());
        adminTokenDto.setNome(admin.getName());
        adminTokenDto.setToken(token);

        return adminTokenDto;
    }
}
