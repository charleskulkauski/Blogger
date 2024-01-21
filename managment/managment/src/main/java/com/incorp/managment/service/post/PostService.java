package com.incorp.managment.service.post;

import com.incorp.managment.repository.PostRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    
    public ResponseEntity<Void> delete(String idStr){
        final long id = Long.parseLong(idStr);

        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(404).build();
    }
}


