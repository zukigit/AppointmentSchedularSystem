package com.ai.backEnd.controller;

import com.ai.backEnd.model.Image;
import com.ai.backEnd.model.User;
import com.ai.backEnd.service.ImageService;
import com.ai.backEnd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class ImageController {

    @Autowired
    private ImageService service;
    @Autowired
    private UserService userService;

    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file, @RequestParam("id") String employee_id) throws IOException {
        String id = employee_id;
        User user = userService.getUserById(id);
        String uploadImage = service.uploadImage(file);
        String name = file.getOriginalFilename();
        Optional<Image> image =  service.getImageByName(name);
        int a = image.get().getPhoto_id();
        user.setPhoto_id(a);
        userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
    }

    @GetMapping("{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName){
        byte[] imageData = service.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(imageData);
    }
    @GetMapping("/getImage")
    public List<Image> getImage(){
        return service.getImage();
    }

    //Delete User
    @DeleteMapping("/deleteImage/{photo_id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable int photo_id){
        service.deleteImage(photo_id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}