package com.ai.backEnd.controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.ai.backEnd.model.User;
import com.ai.backEnd.model.UserImage;
import com.ai.backEnd.service.UserImageService;
import com.ai.backEnd.service.UserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class UserImageController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserImageService userImageService;
	
	@PostMapping("/uploadImage")
	public ResponseEntity<byte[]> saveImage(@RequestParam("image") MultipartFile image, @RequestParam("userId") String userId) throws IOException {
		User user = userService.getUserById(userId);
		UserImage oldImage = user.getUserImage();
		UserImage userImage = new UserImage();
		byte[] imageData = image.getBytes();
		
		userImage.setImage_name(image.getOriginalFilename());
		userImage.setImage_content_type(image.getContentType());
		userImage.setData(imageData);
		
		user.setUserImage(userImage);
		userService.saveUser(user);
		
		if(oldImage != null) {
			userImageService.deleteImage(oldImage);
		}
				
		return getImage(userId);
	}
	
	@GetMapping("/images/{userId}")
	public ResponseEntity<byte[]> getImage(@PathVariable String userId) throws IOException{
		
		UserImage userImage = userService.getUserById(userId).getUserImage();
		HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.IMAGE_JPEG);
	    return new ResponseEntity<>(userImage.getData(), headers, HttpStatus.OK);
	}
}
