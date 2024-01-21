package com.incorp.managment.controller;

import com.incorp.managment.model.Post;
import com.incorp.managment.repository.PostRepository;
import com.incorp.managment.service.post.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostService postService;

    @GetMapping
    public List<Post> getAll(){
        return postRepository.findAll();
    }

    @GetMapping("/{category}")
    public List<Post> getPostByCategory(@PathVariable String category){
        return postRepository.findAllByCategory(category);
    }

    @GetMapping("/last")
    public List<Post> getLastPosts(){

        List<Post> latest = new ArrayList<>();

        Pageable pageableComunicated = PageRequest.of(0,2);
        Pageable pageableUndertaking = PageRequest.of(0,1);

        List<Post> postsComunicated = postRepository.findLastTwoComunicated(pageableComunicated).get().toList();

        List<Post> postsUndertaking = postRepository.findLastUndertaking(pageableUndertaking).get().toList();

        latest.addAll(postsComunicated);
        latest.addAll(postsUndertaking);

        return latest;
    }


    @PostMapping
    public ResponseEntity<Post> sendPost(@RequestBody Post post){
        if (post.getBlob() == null){
            post.setBlob("#");
        }
        postRepository.save(post);

        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/{idStr}")
    public ResponseEntity deletePostById(@PathVariable String idStr){
        postService.delete(idStr);

        return ResponseEntity.status(OK).build();
    }
}
