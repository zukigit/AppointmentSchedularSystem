package com.ai.backEnd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.ai.backEnd.model.LoginRequestModel;
import com.ai.backEnd.security.jwt.JwtGenerate;
import com.ai.backEnd.security.jwt.JwtResponse;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

	@Autowired
	JwtGenerate generate;
	
	@PostMapping("/auth")
	public JwtResponse getLogin(@RequestBody LoginRequestModel model) {
		return generate.checkLoginRequest(model);
	}
}
