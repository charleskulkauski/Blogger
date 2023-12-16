package com.incorp.managment.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
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

    public Post(String title, String text) {
        this.title = title;
        this.text = text;
    }

    public Post(String title, String text, String date, String category) {
        this.title = title;
        this.text = text;
        this.date = date;
        this.category = category;
    }

}
