package com.incorp.managment.repository;

import com.incorp.managment.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    void deleteById(Long id);

    @Query("SELECT p FROM Post p WHERE p.category =:category")
    List<Post> findAllByCategory(@Param("category") String category);

    @Query("SELECT p FROM Post p WHERE p.category ='Comunicado' ORDER BY p.id DESC")
    Page<Post> findLastTwoComunicated(Pageable pageable);


    @Query("SELECT p FROM Post p WHERE p.category ='Empreendimento' ORDER BY p.id DESC")
    Page<Post> findLastUndertaking(Pageable pageable);

}
