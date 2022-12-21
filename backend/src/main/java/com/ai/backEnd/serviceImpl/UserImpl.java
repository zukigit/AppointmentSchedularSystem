package com.ai.backEnd.serviceImpl;

import java.util.List;

import com.ai.backEnd.model.UserSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ai.backEnd.model.User;
import com.ai.backEnd.model.UserDetail;
import com.ai.backEnd.repository.UserRespositroy;
import com.ai.backEnd.service.UserService;

@Service
public class UserImpl implements UserService{
	
	@Autowired
	private UserRespositroy repo;

	@Override
	public List<User> getAllUser() {
		List<User> list = repo.findAll();
		return list;
	}

	@Override
	public User saveUser(User user) {
		return repo.save(user);
	}

	@Override
	public User getUserById(String employee_id) {
		return repo.findById(employee_id).get();
	}

	@Override
	public void deleteUserById(String employee_id) {
		repo.deleteById(employee_id);
	}

	@Override
	public User updateUser(User employee_id) {
		return repo.save(employee_id);
	}
	
	@Override
	public List<UserDetail> userDetail() {
		return repo.userDetail();
	}

	@Override
	public List<UserDetail> searchByNameOrId(String searchKey) {

		return repo.searchByNameOrId(searchKey);
	}

	@Override
	public List<UserDetail> seacrhByDepartmentName(String searchKey) {
		return repo.seacrhByDepartmentName(searchKey);
	}

	@Override
	public List<UserDetail> searchByTeamName(String searchKey) {
		return repo.searchByTeamName(searchKey);
	}

	@Override
	public boolean  deleteById(String employee_id) {
		boolean bol;
		if(bol = true){
			repo.deleteById(employee_id);
			System.out.println("Delete successful....");
		}else{
		return true;
		}
		return bol;
	}
}
