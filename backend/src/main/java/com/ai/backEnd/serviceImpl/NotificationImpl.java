package com.ai.backEnd.serviceImpl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.Notification;
import com.ai.backEnd.model.User;
import com.ai.backEnd.repository.NotificationRepository;
import com.ai.backEnd.service.NotificationService;

@Service

public class NotificationImpl implements NotificationService{
	
	@Autowired
	private NotificationRepository repo;

	@Override
	public List<Notification> getNoti(String employee_id) {
		List<Notification> nf= repo.getNoti(employee_id);
		for(Notification noti : nf) {
		    Appointment	appointment = noti.getAppointment();
		    Appointment saveAppointment = new Appointment();
		    User user = noti.getUser();
		    User saveUser = new User();
		    saveUser.setEmployee_id(user.getEmployee_id());
		    saveAppointment.setAppointment_id(appointment.getAppointment_id());
		    noti.setUser(saveUser);
		    noti.setAppointment(saveAppointment);
		}
		return nf;
	}

	@Override
	public Notification addNoti(Notification n2) {
		    return repo.save(n2);

	}

}
