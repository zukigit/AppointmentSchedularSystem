package com.zuki.securityTest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.zuki.securityTest.jwt.JwtResponse;
import com.zuki.securityTest.model.LoginRequestModel;
import com.zuki.securityTest.securtiy.JwtGenerate;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

	@Autowired
	JwtGenerate generate;
	
	@PostMapping("/auth")
	public JwtResponse getLogin(@RequestBody LoginRequestModel model) {
		var token = generate.checkLoginRequest(model);
		if(!token.equals("")) {
			System.out.println("all fine");
			return new JwtResponse().setToken(token);
		} else {
			System.out.println("token is null");
			return null;
		}
	}
}
