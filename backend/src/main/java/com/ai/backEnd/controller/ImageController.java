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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class ImageController {

    @Autowired
    private ImageService service;
    @Autowired
    private UserService userService;

    //Upload Image By User Id
    @PostMapping("/imageUpload")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file, @RequestParam("id") String employee_id) throws IOException {
        String id = employee_id;
        User user = userService.getUserById(id);
        String uploadImage = service.uploadImage(file);
        String name = file.getOriginalFilename();
        ArrayList<Image> image =  service.getImageByName(name);
        for (int i = 0; i < image.size()-1; i++) {
            Image setImage = image.get(i);
             user.setPhoto_id(setImage.getPhoto_id());
        }
        userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
    }

    //Get Image By User Id
    @GetMapping("/getImageByUserId")
    public ResponseEntity<?> downloadImage( @RequestParam("id") String employee_id){
        String id = employee_id;
        User user = userService.getUserById(id);
        int i = user.getPhoto_id();
        Image data = service.getImageById(i);
        byte[] imageData = service.downloadImage(data.getName());
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(imageData);
    }

    @GetMapping("/getImage")
    public List<Image> getImage(){
        return service.getImage();
    }

    //Delete Image By User Id
    @DeleteMapping("/deleteImageByUserId/{employee_id}")
    public ResponseEntity<Map<String, Boolean>> deleteImageByUserId(@PathVariable String employee_id){
        String id = employee_id;
        User user = userService.getUserById(id);
        int i = user.getPhoto_id();
        Image data = service.getImageById(i);
        int photo_id = data.getPhoto_id();
        if(i == photo_id){
            user.setPhoto_id(0);
            userService.saveUser(user);
        }
        service.deleteImage(photo_id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    //Get Image By Photo Id
    @GetMapping("/getImageById/{photo_id}")
    public ResponseEntity<Image> getImageById(@PathVariable int photo_id){
		Image image = new Image();
		image = service.getImageById(photo_id);
		return ResponseEntity.ok(image);
	}

}