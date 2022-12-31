package com.ai.backEnd.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class ImageTestController {
	
	@PostMapping("/testImage")
	public ResponseEntity<String> saveImage(@RequestParam("image") MultipartFile image) {
		System.out.println("image controller is called" + image.getOriginalFilename());
		return ResponseEntity.ok("Successfully saved image");
	}
}
