package com.ai.backEnd.service;

import java.util.List;


import com.ai.backEnd.model.Notification;

public interface NotificationService {
	
	List<Notification> getNotiByUser(List<String> user_ids);

       Notification addNoti(Notification notification);

       void deleteNoti(int id);

      

       List<Notification> getUnreadNoti(List<String> user_ids);

}
