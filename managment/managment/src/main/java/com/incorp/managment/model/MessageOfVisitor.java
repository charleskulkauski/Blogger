package com.incorp.managment.model;

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
public class MessageOfVisitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "{campo.nome.obrigatorio}")
    private String name;

    @NotEmpty(message = "{campo.sobrenome.obrigatorio}")
    private String lastName;

    @NotEmpty(message = "{campo.email.obrigatorio}")
    private String email;

    @NotEmpty(message = "{campo.mensagem.obrigatorio}")
    private String message;

    public MessageOfVisitor(String name, String lastName, String email, String message) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.message = message;
    }
}
