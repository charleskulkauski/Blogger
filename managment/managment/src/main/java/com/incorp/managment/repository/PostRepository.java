package com.incorp.managment.repository;

import com.incorp.managment.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    void deleteById(Long id);

    @Query("SELECT p FROM Post p WHERE p.category = :category")
    List<Post> findAllByCategory(@Param("category") String category);


    @Query("SELECT p FROM Post p LEFT JOIN p.admin a WHERE p.category = :category AND a.id = :adminLogged")
    List<Post> findAllAdminByCategory(@Param("adminLogged") Long adminLogged, @Param("category") String category);

    @Query("SELECT p FROM Post p WHERE p.admin.idAdmin = :id")
    List<Post> findAllWhereAdmin(Long id);

}
