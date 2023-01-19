package com.ai.backEnd.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ai.backEnd.dto.AppAndNoti;
import com.ai.backEnd.model.Notification;
import com.ai.backEnd.model.User;
import com.ai.backEnd.serviceImpl.NotificationImpl;
import com.ai.backEnd.serviceImpl.UserImpl;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class NotificationController {
	
	@Autowired
	private NotificationImpl notiService;
	
	@Autowired
	private UserImpl userService;
	
	@GetMapping(value ="/getNoti/{employee_id}")
	public List<Notification> getNoti(@PathVariable String employee_id){
		String  id = employee_id;
        User user = userService.getUserById(id);
		return notiService.getNoti(user.getEmployee_id());	
	}

	@PostMapping("/SaveNoti")
	public Notification addNoti(@RequestBody Notification noti){
		 return notiService.addNoti(noti);
	}
		
}
