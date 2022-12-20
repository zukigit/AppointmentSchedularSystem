package com.ai.backEnd.repository;




import com.ai.backEnd.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Repository

public interface ImageRepository extends JpaRepository<Image,Integer> {

    Optional<Image> findByName(String fileName);

}