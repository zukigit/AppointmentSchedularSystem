package com.ai.backEnd.serviceImpl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ai.backEnd.model.Notification;
import com.ai.backEnd.repository.NotificationRepository;
import com.ai.backEnd.service.NotificationService;

@Service

public class NotificationImpl implements NotificationService{
	
	@Autowired
	private NotificationRepository repo;

	@Override
	public Notification addNoti(Notification n2) {
		    return repo.save(n2);

	}

@Override
public List<Notification> getNotiByUser(List<String> user_ids) {
	return repo.getNotiByUser(user_ids);
}

@Override
public void deleteNoti(int id) {
     repo.deleteById(id);
	
}



@Override
public List<Notification> getUnreadNoti(List<String> user_ids) {
	return repo.getUnreadNoti(user_ids);
}



}
