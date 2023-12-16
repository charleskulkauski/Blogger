package com.incorp.managment.service.admin.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CriarAdminDto {

    @Size(min = 3, max = 10)
    private String nome;

    @Email
    private String email;

    @Size(min = 6, max = 20)
    private String senha;
}
