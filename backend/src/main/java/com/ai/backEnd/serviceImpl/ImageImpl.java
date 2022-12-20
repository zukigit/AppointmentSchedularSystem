package com.ai.backEnd.serviceImpl;

import com.ai.backEnd.model.Image;
import com.ai.backEnd.repository.ImageRepository;
import com.ai.backEnd.service.ImageService;
import com.ai.backEnd.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ImageImpl implements ImageService {

    @Autowired
    private ImageRepository repo;


    @Override
    public String uploadImage(MultipartFile file) throws IOException {
        Image image = repo.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtils.compressImage(file.getBytes())).build());

        if (image != null) {
            return "file upload success : " + file.getOriginalFilename();
        }
        return null;
    }

    @Override
    public byte[] downloadImage(String fileName) {
        Optional<Image> dbImageData = repo.findByName(fileName);
        byte[] images = ImageUtils.decompressImage(dbImageData.get().getImageData());
        return images;
    }

    @Override
    public Optional<Image> getImageByName(String name) {
        return repo.findByName(name);
    }

    @Override
    public List<Image> getImage() {
        return repo.findAll();
    }

    @Override
    public void deleteImage(int photo_id) {
        repo.deleteById(photo_id);

    }
}