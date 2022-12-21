package com.ai.backEnd.repository;




import com.ai.backEnd.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository

public interface ImageRepository extends JpaRepository<Image,Integer> {

    Optional<Image> findByName(String fileName);

}