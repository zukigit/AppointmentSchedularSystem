package com.ai.backEnd.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.ai.backEnd.model.User;
import com.ai.backEnd.dto.UserDetail;
import com.ai.backEnd.dto.UserDetailForUpdate;

@Repository
public interface UserRespositroy extends JpaRepository<User, String>{
	
	@Query("SELECT " +
	           "    new com.ai.backEnd.dto.UserDetail(u.employee_id, u.name,u.role, t.team_name, d.department_name, t.team_id) " +
	           "FROM " +
	           "    User u join Team t on u.team.team_id = t.team_id join Department d on d.department_id = t.department.department_id")
	List<UserDetail> userDetail();

	@Query("SELECT " +
			"    new com.ai.backEnd.dto.UserDetail(u.employee_id, u.name,u.role, t.team_name, d.department_name, t.team_id) " +
			"FROM " +
			"    User u join Team t on u.team.team_id = t.team_id join Department d on d.department_id = t.department.department_id where u.name=:searchKey or u.employee_id=:searchKey")
	List<UserDetail> searchByNameOrId(String searchKey);

	@Query("SELECT " +
			"    new com.ai.backEnd.dto.UserDetail(u.employee_id, u.name,u.role, t.team_name, d.department_name, t.team_id) " +
			"FROM " +
			"    User u join Team t on u.team.team_id = t.team_id join Department d on d.department_id = t.department.department_id where d.department_name=:searchKey")
	List<UserDetail> seacrhByDepartmentName(String searchKey);
	@Query("SELECT " +
			"    new com.ai.backEnd.dto.UserDetail(u.employee_id, u.name,u.role, t.team_name, d.department_name, t.team_id) " +
			"FROM " +
			"    User u join Team t on u.team.team_id = t.team_id join Department d on d.department_id = t.department.department_id where t.team_name=:searchKey")
	List<UserDetail> searchByTeamName(String searchKey);

	@Query("select count(p) = 1 from User p where employee_id = ?1 and p.isEnabled = TRUE")
	public boolean checkUserExist(String userId);
	
	@Query("SELECT " +
			"    new com.ai.backEnd.dto.UserDetailForUpdate(u.employee_id, u.name, u.role, t.team_name, d.department_name, u.phone_number, u.position, u.gender, t.team_id) " +
			"FROM " +
			"    User u join Team t on u.team.team_id = t.team_id join Department d on d.department_id = t.department.department_id where u.employee_id=:searchKey")
	UserDetailForUpdate searchById(String searchKey);
	
	@Query("SELECT new com.ai.backEnd.dto.UserDetail(u.employee_id, u.name,u.role, t.team_name, d.department_name, t.team_id) FROM User u join Team t on u.team.team_id = t.team_id join Department d on d.department_id = t.department.department_id"
			+ " WHERE u NOT IN (:users)")
	List<UserDetail> getAvaliableUsers(List<User> users);

	
}
