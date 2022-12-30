package com.ai.backEnd.service;

import com.ai.backEnd.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public interface ImageService {

    String uploadImage(MultipartFile file) throws IOException;
    byte[] downloadImage(String fileName);

    ArrayList<Image> getImageByName(String name);

    List<Image> getImage();

    Image getImageById(int photo_id);

    void deleteImage(int photo_id);
}