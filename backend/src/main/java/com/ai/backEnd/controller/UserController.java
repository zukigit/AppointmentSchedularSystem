package com.ai.backEnd.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.ai.backEnd.dto.ChangePasswordModel;
import com.ai.backEnd.model.User;
import com.ai.backEnd.dto.UserDetail;
import com.ai.backEnd.dto.UserDetailForUpdate;
import com.ai.backEnd.model.UserRole;
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
	public void saveUser(@RequestBody User user) {
		if(service.isUserExist(user.getEmployee_id())) {
	        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "UserId already exists!");
		} else {
			String encodedPassword = passwordEncoder.encode(user.getPassword());
			user.setPassword(encodedPassword);
			service.saveUser(user);
		}
	}
	
	//Delete User
	@DeleteMapping("/deleteUser/{employee_id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable String employee_id){
		User dto =  service.getUserById(employee_id);
		if(dto.getRole() == UserRole.ADMIN) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Admin can't be deleted");
		} else {
			service.deleteUserById(employee_id);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
		}
	}
	
	//GetById
	@GetMapping("/getById/{employee_id}")
	@PreAuthorize("hasRole('ADMIN')")
	public UserDetailForUpdate getUserById(@PathVariable String employee_id){
		return service.searchById(employee_id);
	}
	//Update User
	@PutMapping("/updateUser/{employee_id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<User> updateUser(@RequestBody User user){
		user.setUserImage(service.getUserById(user.getEmployee_id()).getUserImage());
		if(user.getPassword().equals("")) {
			User retreatedUser = service.getUserById(user.getEmployee_id());
			user.setPassword(retreatedUser.getPassword());
		} else {
			String encodedPassword = passwordEncoder.encode(user.getPassword());
			user.setPassword(encodedPassword);
		}
		service.saveUser(user);
		return ResponseEntity.ok(user);
	}
	
	@GetMapping("/userDetail")
	public List<UserDetail> userDetail(){
		return service.userDetail();
	}

	@GetMapping("/updatePhoneNumber")
    @PreAuthorize("hasRole('ADMIN')")
    public String updatePhone(@RequestParam String userId,@RequestParam String newPhoneNumber) {

        User user = service.getUserById(userId);
        user.setPhone_number(newPhoneNumber);
        service.saveUser(user);
        return user.getPhone_number();
    }

    @PostMapping("/changePassword")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> changePassword(@RequestBody ChangePasswordModel changePasswordModel) {
        User user = service.getUserById(changePasswordModel.getUserId());
        if(passwordEncoder.matches(changePasswordModel.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(changePasswordModel.getNewPassword()));
            service.saveUser(user);
            return ResponseEntity.ok(true);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Old password is wrong!");
        }
    }
}
