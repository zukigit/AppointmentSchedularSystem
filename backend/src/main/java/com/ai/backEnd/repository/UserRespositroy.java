package com.ai.backEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ai.backEnd.model.User;

@Repository
public interface UserRespositroy extends JpaRepository<User, String>{

}
