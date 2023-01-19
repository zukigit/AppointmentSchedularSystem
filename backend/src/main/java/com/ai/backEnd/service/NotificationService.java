package com.ai.backEnd.service;

import java.util.List;

import com.ai.backEnd.dto.AppAndNoti;
import com.ai.backEnd.model.Notification;

public interface NotificationService {
	
	 List<Notification> getNoti(String employee_id);

      //void addNoti(AppAndNoti noti);

      Notification addNoti(Notification notification);

}
