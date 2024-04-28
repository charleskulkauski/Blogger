package com.incorp.managment.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Admin {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long idAdmin;

    @JsonProperty
    @NotEmpty(message = "{campo.nome.obrigatorio}")
    private String name;
    @JsonProperty
    @NotEmpty(message = "{campo.email.obrigatorio}")
    private String email;
    @JsonProperty
    @NotEmpty@NotEmpty(message = "{campo.senha.obrigatorio}")
    private String password;
    @OneToMany(mappedBy = "admin")
    @JsonIgnore
    private List<Post> posts;

    public Admin(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @Override
    public String toString() {
        return "Admin{idAdmin=" + idAdmin + ", name='" + name + "', email='" + email + "'}";
    }
}
