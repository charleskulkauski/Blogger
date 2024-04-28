package com.incorp.managment.controller;

import com.incorp.managment.model.Admin;
import com.incorp.managment.model.Post;
import com.incorp.managment.repository.AdminRepository;
import com.incorp.managment.repository.PostRepository;
import com.incorp.managment.service.post.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostService postService;

    @Autowired
    AdminRepository adminRepository;


    @GetMapping
    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    @GetMapping("/category/{category}")
    public List<Post> getPostsByCategory(@PathVariable String category){
        return postRepository.findAllByCategory(category);
    }

    @GetMapping("/{idAdmin}")
    public List<Post> findAllByIdAdmin(@PathVariable Long idAdmin){
        return postRepository.findAllWhereAdmin(idAdmin);
    }

    @GetMapping("/{adminLogged}/{category}")
    public List<Post> getPostAdminByCategory(@PathVariable Long adminLogged, String category){
        return postRepository.findAllAdminByCategory(adminLogged, category);
    }

    @GetMapping("/last")
    public List<Post> getLastToIndex(){
        List<Post> allPosts = getAllPosts();

        Collections.reverse(allPosts);

        List<Post> posts = new ArrayList<>();

        if (allPosts.size() >= 2){
            for (int i= 0; i < 2; i++) {
                posts.add(allPosts.get(i));
            }

            return posts;
        }


        return posts;
    }

    @GetMapping("/{idAdmin}/last")
    public List<Post> getLastPosts(@PathVariable Long idAdmin){

        List<Post> latest = new ArrayList<>();

        List<Post> allPosts = findAllByIdAdmin(idAdmin);

        Collections.reverse(allPosts);

        List<Post> postsUndertaking = new ArrayList<>();
        for (int i= 0; i < 5; i++) {
            postsUndertaking.add(allPosts.get(i));
        }

        List<Post> postsComunicated = new ArrayList<>();
        for (int i= 0; i < 5; i++) {
            String name = postsComunicated.get(i).getAdmin().getName();
            postsComunicated.add(allPosts.get(i));
        }

        latest.addAll(postsComunicated);
        latest.addAll(postsUndertaking);

        return latest;
    }

    @PostMapping
    public ResponseEntity<Post> sendPost(@RequestBody Post post){

        Optional<Admin> findAdmin = adminRepository.findByEmail(post.getEmailAdmin());

        post.setAdmin(findAdmin.get());

        if(post.getCategory() == "Comunicado"){
            String blobEmpty = "#";
            if (!Objects.equals(post.getBlob(), blobEmpty)){
                post.setBlob("#");
            }
        }

        return ResponseEntity.status(200).body(postRepository.save(post));
    }

    @DeleteMapping("/{idStr}")
    public ResponseEntity deletePostById(@PathVariable String idStr){
        postService.delete(idStr);
        return ResponseEntity.status(OK).build();
    }
}
