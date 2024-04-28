package com.incorp.managment.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String text;
    private String date;
    private String category;
    @Lob
    private String blob;
    @JoinColumn(name="email_admin")
    private String emailAdmin;

    @JoinColumn(name="name_admin")
    private String nameAdmin;
    @ManyToOne
    @JoinColumn(name="id_admin_post")
    @JsonBackReference
    private Admin admin;

    public Post(String title, String text) {
        this.title = title;
        this.text = text;
    }

    public Post(String title, String text, String date, String category, String emailAdmin) {
        this.title = title;
        this.text = text;
        this.date = date;
        this.category = category;
        this.emailAdmin = emailAdmin;
    }

    @Override
    public String toString() {
        return "Post{id=" + id + ", title='" + title + "', text='" + text + "'}";
    }

}
