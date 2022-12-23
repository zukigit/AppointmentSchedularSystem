package com.ai.backEnd.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ai.backEnd.model.User;
import com.ai.backEnd.model.UserDetail;

@Repository
public interface UserRespositroy extends JpaRepository<User, String>{
//	@Query(value = "select u.employee_id,u.name,u.role, t.team_name,d.department_name from user u inner join team t on u.team_id = t.team_id inner join department d on t.department_id = d.department_id order by u.employee_id",nativeQuery = true)
//    List<UserDetail> userDetail();
	
	@Query("SELECT " +
	           "    new com.ai.backEnd.model.UserDetail(u.employee_id, u.name,u.role, t.team_name, d.department_name) " +
	           "FROM " +
	           "    User u join Team t on u.team.team_id = t.team_id join Department d on d.department_id = t.department.department_id where u.isEnabled = TRUE")
	List<UserDetail> userDetail();

	@Query("SELECT " +
			"    new com.ai.backEnd.model.UserDetail(u.employee_id, u.name,u.role, t.team_name, d.department_name) " +
			"FROM " +
			"    User u join Team t on u.team.team_id = t.team_id join Department d on d.department_id = t.department.department_id where u.name=:searchKey or u.employee_id=:searchKey and u.isEnabled = TRUE")
	List<UserDetail> searchByNameOrId(String searchKey);

	@Query("SELECT " +
			"    new com.ai.backEnd.model.UserDetail(u.employee_id, u.name,u.role, t.team_name, d.department_name) " +
			"FROM " +
			"    User u join Team t on u.team.team_id = t.team_id join Department d on d.department_id = t.department.department_id where d.department_name=:searchKey and u.isEnabled = TRUE")
	List<UserDetail> seacrhByDepartmentName(String searchKey);
	@Query("SELECT " +
			"    new com.ai.backEnd.model.UserDetail(u.employee_id, u.name,u.role, t.team_name, d.department_name) " +
			"FROM " +
			"    User u join Team t on u.team.team_id = t.team_id join Department d on d.department_id = t.department.department_id where t.team_name=:searchKey and u.isEnabled = TRUE")
	List<UserDetail> searchByTeamName(String searchKey);

	@Query("select count(p) = 1 from User p where employee_id = ?1 and p.isEnabled = TRUE")
	public boolean checkUserExist(String userId);
	
	@Query("SELECT " +
			"    new com.ai.backEnd.model.UserDetail(u.employee_id, u.name,u.role, t.team_name, d.department_name) " +
			"FROM " +
			"    User u join Team t on u.team.team_id = t.team_id join Department d on d.department_id = t.department.department_id where u.employee_id=:searchKey and u.isEnabled = TRUE")
	UserDetail searchById(String searchKey);
}
