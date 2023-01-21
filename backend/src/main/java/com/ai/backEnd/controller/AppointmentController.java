package com.ai.backEnd.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ai.backEnd.dto.ShowAppointment;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.Notification;
import com.ai.backEnd.model.User;
import com.ai.backEnd.serviceImpl.AppointmentImpl;
import com.ai.backEnd.serviceImpl.NotificationImpl;
import com.fasterxml.jackson.core.JsonProcessingException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class AppointmentController {

    @Autowired
    private AppointmentImpl appointmentService;
    
    @Autowired
    private NotificationImpl notiService;

	@GetMapping("/getApp")
	public ResponseEntity<List<Appointment>> getAppoint(){
		List<Appointment> app = appointmentService.getAppointment();
		return ResponseEntity.ok(app);
	}

	@PostMapping("/addAppointment")
	public ResponseEntity<String> registerAppointmnet(@RequestBody Appointment appointment ){
		List<User> users = appointment.getEmployee();
		appointmentService.saveAppointment(appointment);
		for(User user : users) {
			Notification noti = new Notification();
			noti.setAppointment(appointment);
			noti.setUser(user);
			noti.setDescription(appointment.getDescription());
			noti.setDeleteStatus(false);
			notiService.addNoti(noti);
		}
		return new ResponseEntity<>(appointment.getAppointment_id().toString(), HttpStatus.OK);
	}
	
	@GetMapping("/getAppByEmpId/{employee_id}")
	public ResponseEntity<List<ShowAppointment>> getShowApp(@PathVariable String employee_id)throws JsonProcessingException {
		List<ShowAppointment> showAppointments = new ArrayList<ShowAppointment>();
		List<String> user_ids = new ArrayList<>(List.of(employee_id));
		List<Appointment> appointments = appointmentService.getByUserList(user_ids);
		
		for(Appointment appointment : appointments) {
			ShowAppointment showAppointment = new ShowAppointment();
			showAppointment.setAppointment_id(appointment.getAppointment_id());
			showAppointment.setTitle(appointment.getTitle());
			showAppointment.setDescription(appointment.getDescription());
			showAppointment.setType(appointment.getType());
			showAppointment.setCreateUser(appointment.getCreateUser());
			showAppointment.setSchedules(appointment.getSchedules());
			
			showAppointments.add(showAppointment);
		}
		return new ResponseEntity<List<ShowAppointment>>(showAppointments, HttpStatus.OK);
	}

	@GetMapping("/getAll")
	public List<Appointment> getAll(){
		return appointmentService.getAll();
	}
	
	@GetMapping("/getAppById/{appointment_id}")
	public ResponseEntity<Appointment> getShowAppById(@PathVariable String appointment_id) {
		Appointment appointments = appointmentService.getAppById(Integer.parseInt(appointment_id));
		
		
		return new ResponseEntity<Appointment>(appointments, HttpStatus.OK);
	}
}


