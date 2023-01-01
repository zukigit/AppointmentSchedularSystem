package com.ai.backEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ai.backEnd.model.UserImage;

@Repository
public interface UserImageRepo extends JpaRepository<UserImage, Integer>{

}
