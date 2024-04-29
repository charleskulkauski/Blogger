package com.incorp.managment.repository;

import com.incorp.managment.model.MessageOfVisitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<MessageOfVisitor, Long>{
}
