package com.ai.backEnd.controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	public UserImage saveImage(@RequestParam("image") MultipartFile image, @RequestParam("userId") String userId) throws IOException {
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
		
		User savedUser = userService.getUserById(userId);
		UserImage newImage = savedUser.getUserImage();
		
		return newImage;
	}
}
