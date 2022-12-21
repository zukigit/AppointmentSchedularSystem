package com.ai.backEnd.service;

import com.ai.backEnd.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ImageService {

    String uploadImage(MultipartFile file) throws IOException;
    byte[] downloadImage(String fileName);

    Optional<Image> getImageByName(String name);

    List<Image> getImage();

    void deleteImage(int photo_id);
}