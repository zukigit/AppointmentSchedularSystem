package com.ai.backEnd.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ai.backEnd.model.Team;
import com.ai.backEnd.model.User;
import com.ai.backEnd.model.UserRegisterationRequestModel;
import com.ai.backEnd.service.UserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class UserController {
	
	@Autowired
	private UserService service;
	
	@GetMapping("/getUser")
	public List<User> getUser(ModelMap model){
		return service.getAllUser();
	}
	
	//AddUser
	@PostMapping("/saveUser" )
	public User saveUser(@RequestBody UserRegisterationRequestModel dto) {
		User user = new User();
		Team team = new Team();
		team.setTeam_id(dto.getTeam_id());
		user.setEmployee_id(dto.getEmployee_id());
		user.setName(dto.getName());
		user.setPassword(dto.getPassword());
		user.setPhone_number(dto.getPhone_number());
		user.setGender(dto.getGender());
		user.setPosition(dto.getPosition());
		user.setRole(dto.getRole());
		user.setTeam(team);
		return service.saveUser(user);
	}
	
	//Delete User
	@DeleteMapping("/deleteById/{employee_id}")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable String employee_id){
		service.deleteUserById(employee_id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	//GetById
	@GetMapping("/getById/{employee_id}")
	public ResponseEntity<User> getUserById(@PathVariable String employee_id){
		User user = new User();
		user = service.getUserById(employee_id);
		return ResponseEntity.ok(user);
	}
	//Update User
	@PutMapping("/updateUser/{employee_id}")
	public ResponseEntity<User> updateUser(@PathVariable String employee_id,@RequestBody User user){
		User dto = new User();
		dto.setEmployee_id(user.getEmployee_id());
		dto.setName(user.getName());
		dto.setPassword(user.getPassword());
		dto.setPhone_number(user.getPhone_number());
		dto.setGender(user.getGender());
		dto.setPosition(user.getPosition());
		dto.setRole(user.getRole());
		dto.setTeam(user.getTeam());
		User updateUser = service.updateUser(dto);
		return ResponseEntity.ok(updateUser);
	}
	
	
	
}
