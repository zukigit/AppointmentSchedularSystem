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

//	@Override
//	List<Notification> getNotiByUser(List<String> user_ids) {
//		return repo.getNotiByUser(user_ids);;
//	}{
////		List<Notification> nf= repo.getNoti(employee_id);
////		for(Notification noti : nf) {
////		    Appointment	appointment = noti.getAppointment();
////		    Appointment saveAppointment = new Appointment();
////		    User user = noti.getUser();
////		    User saveUser = new User();
////		    saveUser.setEmployee_id(user.getEmployee_id());
////		    saveAppointment.setAppointment_id(appointment.getAppointment_id());
////		    noti.setUser(saveUser);
////		    noti.setAppointment(saveAppointment);
////		}
//		//return 
//		
//	}

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

}
