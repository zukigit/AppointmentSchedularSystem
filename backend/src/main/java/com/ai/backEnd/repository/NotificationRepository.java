package com.ai.backEnd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.ai.backEnd.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer>{
	
	

	@Query("SELECT n FROM Notification n JOIN n.user u WHERE u.employee_id IN (:user_ids)")
	List<Notification> getNotiByUser(List<String> user_ids);

	@Query("SELECT n FROM Notification n JOIN n.user u WHERE u.employee_id IN (:user_ids) AND n.isReaded = false ")
	List<Notification> getUnreadNoti(List<String> user_ids);

}
