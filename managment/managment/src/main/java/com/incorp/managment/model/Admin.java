package com.incorp.managment.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Entity
public class Admin {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @JsonProperty
    @NotEmpty(message = "{campo.nome.obrigatorio}")
    private String name;
    @JsonProperty
    @NotEmpty(message = "{campo.email.obrigatorio}")
    private String email;
    @JsonProperty
    @NotEmpty@NotEmpty(message = "{campo.senha.obrigatorio}")
    private String password;

    public Admin(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
