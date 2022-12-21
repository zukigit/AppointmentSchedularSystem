package com.ai.backEnd.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import com.ai.backEnd.model.User;
import com.ai.backEnd.model.UserDetail;
import com.ai.backEnd.model.UserSearch;
import com.ai.backEnd.service.UserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class UserController {
	
	@Autowired
	private UserService service;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@GetMapping("/getUser")
	@PreAuthorize("hasRole('ADMIN')")
	public List<User> getUser(ModelMap model,User employee){
		return service.getAllUser();
	}
	
	//AddUser
	@PostMapping("/saveUser" )
	@PreAuthorize("hasRole('ADMIN')")
	public User saveUser(@RequestBody User user) {
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		return service.saveUser(user);
	}
	
	//Delete User
	@DeleteMapping("/deleteUser/{employee_id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable String employee_id){
	    service.deleteUserById(employee_id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/deleteById/{employee_id}")
	public ResponseEntity<User> deleteById(@PathVariable String employee_id){
		User dto =  service.getUserById(employee_id);
		dto.setAccountNonExpired(false);
		dto.setAccountNonLocked(false);
		dto.setCredentialsNonExpired(false);
		dto.setEnabled(false);
        User user = service.saveUser(dto);
		return ResponseEntity.ok(user);
	}
	
	//GetById
	@GetMapping("/getById/{employee_id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<User> getUserById(@PathVariable String employee_id){
		User user = new User();
		user = service.getUserById(employee_id);
		return ResponseEntity.ok(user);
	}
	//Update User
	@PutMapping("/updateUser/{employee_id}")
	@PreAuthorize("hasRole('ADMIN')")
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
	
	@GetMapping("/userDetail")
	public List<UserDetail> userDetail(){
		return service.userDetail();
	}

	@GetMapping("/searchUser")
	public List<UserDetail> search(UserSearch userSearch){
		if(userSearch.getSearchType().equals("default")){
			return service.searchByNameOrId(userSearch.getSearchKey());
		}else if (userSearch.getSearchType().equals("searchByDepartment")){
            return service.seacrhByDepartmentName(userSearch.getSearchKey());
		} else if (userSearch.getSearchType().equals("searchByTeam")) {
			return service.searchByTeamName(userSearch.getSearchKey());
		}
			else{
				return null;
		}

	}

	// @DeleteMapping("/del/{employee_id}")
	// @PreAuthorize("hasRole('ADMIN')")
	// public boolean deleteById(@PathVariable String employee_id){
	// 	boolean bol = false;
	// 	if(bol){
	// 		boolean bol1  = service.deleteById(employee_id);
	// 		System.out.println("delete successful " + bol1);
	// 	}
	// 	return true;
	// }
}
