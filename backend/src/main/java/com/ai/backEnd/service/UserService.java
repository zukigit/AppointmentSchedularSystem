package com.ai.backEnd.service;

import java.util.List;

import com.ai.backEnd.model.User;
import com.ai.backEnd.model.UserRegistrationModel;

public interface UserService {
	
	List<User> getAllUser();
	
	User saveUser(User u);
	
	User getUserById(String employee_id);
	
	void deleteUserById(String employee_id);
	
	User updateUser(User emploee_id);
	

}
