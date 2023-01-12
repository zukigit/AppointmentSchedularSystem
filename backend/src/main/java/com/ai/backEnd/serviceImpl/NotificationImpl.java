package com.ai.backEnd.serviceImpl;

import java.util.ArrayList;
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
	public List<Notification> getNoti(String employee_id) {
		List<Notification> nf=repo.getNoti(employee_id);
		List<Notification> list=new ArrayList<Notification>();
		for(Notification n:nf)
		{
			Notification n2=new Notification();
			n2.setDescription(n.getDescription());
			n2.setId(n.getId());
			list.add(n2);
		}
		return list;
	}

	@Override
	public Notification addNoti(Notification notification) {
		return repo.save(notification);
	}

}
