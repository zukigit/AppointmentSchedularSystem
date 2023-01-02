package com.ai.backEnd.service;

import java.util.List;

import com.ai.backEnd.model.User;
import com.ai.backEnd.dto.UserDetail;
import com.ai.backEnd.dto.UserDetailForUpdate;

public interface UserService {
	
	List<User> getAllUser();
	
	User saveUser(User employee);
	
	User getUserById(String employee_id);
	
	void deleteUserById(String employee_id);

	//boolean deleteById(String employee_id);
	
	List<UserDetail> userDetail();
	UserDetailForUpdate searchById(String searchKey);
	List<UserDetail> searchByNameOrId(String searchKey);
	List<UserDetail> seacrhByDepartmentName(String searchKey);

	List<UserDetail> searchByTeamName(String searchKey);

	Boolean isUserExist(String userId);
}
