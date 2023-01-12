package com.ai.backEnd.service;

import java.util.List;

import com.ai.backEnd.model.Notification;

public interface NotificationService {
	
	 List<Notification> getNoti(String employee_id);

     Notification addNoti(Notification notification); 

}
