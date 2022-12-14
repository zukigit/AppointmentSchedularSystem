package com.zuki.securityTest.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

	@GetMapping("/")
	public String getHome() {
		System.out.println("test is called");
		return "home page";
	}
	
	@PostMapping("/test")
	public String postHome() {
		System.out.println("post home is called");
		return "home page";
	}
	
	@RequestMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String getAdminProfile() {
		return "admin profile";
	}
	
	@RequestMapping("/user")
	@PreAuthorize("hasRole('USER')" + "|| hasRole('ADMIN')")
	public String getUserProfile() {
		return "user profile";
	}
}
