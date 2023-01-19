package com.ai.backEnd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ai.backEnd.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer>{
	
	@Query(value = "select * from notification where employee_id=?1 and delete_status='false'",nativeQuery = true)
	List<Notification> getNoti(String employee_id);

	

}
