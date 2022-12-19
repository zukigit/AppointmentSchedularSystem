package com.ai.backEnd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ai.backEnd.model.User;

@Repository
public interface UserRespositroy extends JpaRepository<User, String>{
	@Query(value = "select u.employee_id,u.name,u.role, t.team_name,d.department_name from user u inner join team t on u.team_id = t.team_id inner join department d on t.department_id = d.department_id order by u.employee_id",nativeQuery = true)
    List<?> userDetail();
}
