package com.ai.backEnd.service;

import java.util.List;
import com.ai.backEnd.model.User;
import com.ai.backEnd.model.UserDetail;

public interface UserService {
	
	List<User> getAllUser();
	
	User saveUser(User employee);
	
	User getUserById(String employee_id);
	
	void deleteUserById(String employee_id);
	
	User updateUser(User emploee_id);
	
	List<UserDetail> userDetail();

	List<UserDetail> searchByNameOrId(String searchKey);
	
	List<UserDetail> seacrhByDepartmentName(String searchKey);
	
	List<UserDetail> searchByTeamName(String searchKey);
	
	Boolean isUserExist(String userId);
}
