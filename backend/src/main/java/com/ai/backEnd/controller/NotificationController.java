package com.ai.backEnd.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ai.backEnd.dto.NotificationDTO;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.Notification;
import com.ai.backEnd.model.User;
import com.ai.backEnd.serviceImpl.NotificationImpl;
import com.fasterxml.jackson.core.JsonProcessingException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class NotificationController {
	
	@Autowired
	private NotificationImpl notiService;

	@PostMapping("/SaveNoti")
	public Notification addNoti(@RequestBody Notification noti){
		 return notiService.addNoti(noti);
	}

	@GetMapping(value ="/getNoti/{employee_id}")
	public ResponseEntity<List<NotificationDTO>> getNotiByEmpId(@PathVariable String employee_id)throws JsonProcessingException {
		List<NotificationDTO> notify = new ArrayList<NotificationDTO>();
		List<String> user_ids = new ArrayList<>(List.of(employee_id));
		List<Notification> noti = notiService.getNotiByUser(user_ids);
		
		for(Notification notification : noti) {
			NotificationDTO nf = new NotificationDTO();
			User createUser = new User();
			User user = notification.getAppointment().getCreateUser();
			Appointment app = new Appointment();
			Appointment appointment = notification.getAppointment();
			app.setAppointment_id(appointment.getAppointment_id());
			createUser.setEmployee_id(user.getEmployee_id());
			createUser.setName(user.getName());
			createUser.setUserImage(user.getUserImage());
			nf.setAppointment_id(app.getAppointment_id());
			nf.setId(notification.getId());
			nf.setTitle(notification.getAppointment().getTitle());
			nf.setCreateUser(createUser);
			nf.setNotiType(notification.getNoti_type());
			nf.setIsReaded(notification.isReaded());
			notify.add(nf);
		}
		return new ResponseEntity<List<NotificationDTO>>(notify, HttpStatus.OK);
	}

	@GetMapping("/getTotalNoti/{employee_id}")
	public int totalNoti(@PathVariable String employee_id){
		List<String> user_ids = new ArrayList<>(List.of(employee_id));
        List<Notification> totalNoti = notiService.getNotiByUser(user_ids);
		return totalNoti.size();
	}

	@GetMapping("/getUnreadNoti/{employee_id}")
	public int unReadNoti(@PathVariable String employee_id){
		List<String> user_ids = new ArrayList<>(List.of(employee_id));
        List<Notification> unreadNoti = notiService.getUnreadNoti(user_ids);
		return unreadNoti.size();
	}
	
	@GetMapping("/makeReaded/{notiId}")
	public void makeReaded(@PathVariable int notiId) {
		System.out.println("controller make readed is called");
		Notification notification = notiService.getNotiById(notiId);
		notification.setReaded(true);
		notiService.addNoti(notification);
	}
}
