package com.incorp.managment.service.admin.autenticacao;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminTokenDto {

    private Long userId;
    private String nome;
    private String email;
    private String token;
}
