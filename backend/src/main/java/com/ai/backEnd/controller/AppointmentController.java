package com.ai.backEnd.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.ai.backEnd.dto.ShowAppointment;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.Notification;
import com.ai.backEnd.model.NotificationType;
import com.ai.backEnd.model.Schedule;
import com.ai.backEnd.model.User;
import com.ai.backEnd.service.UserService;
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

	@Autowired
	private UserService userService;
    

	@GetMapping("/getApp")
	public ResponseEntity<List<Appointment>> getAppoint(){
		List<Appointment> app = appointmentService.getAppointment();
		return ResponseEntity.ok(app);
	}


	@PostMapping("/addAppointment")
	public ResponseEntity<String> registerAppointment(@RequestBody Appointment appointment ){
		List<User> users = appointment.getEmployee();
		appointmentService.saveAppointment(appointment);
		for(User user : users) {
			Notification noti = new Notification();
			noti.setAppointment(appointment);
			noti.setUser(user);
			noti.setDescription(appointment.getDescription());
			noti.setDeleteStatus(false);
			noti.setNoti_type(NotificationType.CREATE_APP);
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
		Appointment appointment = appointmentService.getAppById(Integer.parseInt(appointment_id));
		
		return new ResponseEntity<Appointment>(appointment, HttpStatus.OK);
	}
	
	@GetMapping("/isUserIncludeInAppointment")
	public ResponseEntity<Boolean> checkEmployeeInclude(@RequestParam String employeeId, @RequestParam int appointmentId) {
		Appointment appointment = appointmentService.getAppById(appointmentId);
		List<User> users = appointment.getEmployee();
		Boolean isUserInclude = users.stream().anyMatch(value -> employeeId.equals(value.getEmployee_id()));
		
		if(!isUserInclude) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found in requested appointment!");
		} else {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}
	}
	
	@GetMapping("/appointmentDetail/{appointment_id}")
	public ResponseEntity<ShowAppointment> getAppointmentDetail(@PathVariable String appointment_id) {
		Appointment appointment = appointmentService.getAppById(Integer.parseInt(appointment_id));
		ShowAppointment showAppointment = new ShowAppointment();
		List<LocalDate> dates = new ArrayList<>();
		List<Schedule> schedules = appointment.getSchedules();
		for(Schedule schedule : schedules) {
			dates.add(schedule.getDate());
		}
		showAppointment.setAppointment_id(appointment.getAppointment_id());
		showAppointment.setTitle(appointment.getTitle());
		showAppointment.setDescription(appointment.getDescription());
		showAppointment.setType(appointment.getType());
		showAppointment.setCreateUser(appointment.getCreateUser());
		showAppointment.setStart_date(Collections.min(dates));
		showAppointment.setEnd_date(Collections.max(dates));
		showAppointment.setEmployee(appointment.getEmployee());
		showAppointment.setFiles(appointment.getFiles());
		showAppointment.setStart_time(schedules.get(0).getStart_time());
		showAppointment.setEnd_time(schedules.get(0).getEnd_time());
		return new ResponseEntity<ShowAppointment>(showAppointment, HttpStatus.OK);
	}

	@PutMapping("/updateAppointment")
	public Appointment updateAppointment(@RequestBody Appointment appointment) {
		List<User> savedUsers = appointmentService.getAppById(appointment.getAppointment_id()).getEmployee();
		List<User> requestUsers = appointment.getEmployee();
		List<User> deletedUsers = new ArrayList<>();
		List<User> addedUsers = new ArrayList<>();
		for (User user : savedUsers) {
			if(!requestUsers.stream().anyMatch(value -> user.getEmployee_id().equals(value.getEmployee_id()))){
                 deletedUsers.add(user);
			}
		}

		for (User user : requestUsers) {
			if(!savedUsers.stream().anyMatch(value -> user.getEmployee_id().equals(value.getEmployee_id()))){
				addedUsers.add(user);
		   }
		}
		Appointment savedAppointment = appointmentService.saveAppointment(appointment);
		for (User user : deletedUsers) {
			Notification noti = new Notification();
			noti.setAppointment(savedAppointment);
			noti.setUser(user);
			noti.setDescription(savedAppointment.getDescription());
			noti.setDeleteStatus(false);
			noti.setNoti_type(NotificationType.USER_REMOVED);
			notiService.addNoti(noti);
		}
		for (User user : addedUsers) {
			Notification noti = new Notification();
			noti.setAppointment(savedAppointment);
			noti.setUser(user);
			noti.setDescription(savedAppointment.getDescription());
			noti.setDeleteStatus(false);
			noti.setNoti_type(NotificationType.USER_ADD);
			notiService.addNoti(noti);
		}
		return savedAppointment;
	}

	@DeleteMapping("/deleteAppById/{appointment_id}")
	public void deleteAppById(@PathVariable Integer appointment_id){
		appointmentService.deleteAppointmentById(appointment_id);
	}

}


