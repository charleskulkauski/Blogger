package com.incorp.managment.controller;

import com.incorp.managment.dto.MessageDto;
import com.incorp.managment.model.MessageOfVisitor;
import com.incorp.managment.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/message")
@CrossOrigin(origins = "http://localhost:3333")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping
    @ResponseBody
    public MessageOfVisitor sendMessage(@RequestBody MessageDto message){
        MessageOfVisitor messageOfVisitorNew = new MessageOfVisitor(message.getName(), message.getLastName(), message.getEmail(), message.getMessage());

        return messageRepository.save(messageOfVisitorNew);
    }

    @GetMapping
    public List<MessageOfVisitor> findAllMessage(){
        return messageRepository.findAll();
    }
}


