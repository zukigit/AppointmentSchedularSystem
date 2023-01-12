package com.ai.backEnd.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ai.backEnd.dto.ShowAppointment;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.User;
import com.ai.backEnd.serviceImpl.AppointmentImpl;
import com.ai.backEnd.serviceImpl.UserImpl;
import com.fasterxml.jackson.core.JsonProcessingException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class AppointmentController {

    @Autowired
    private AppointmentImpl appointmentService;
    
    @Autowired
    private UserImpl userService;

    // @GetMapping("/getApp")
	// public List<Appointment> getAppointment()  throws JsonProcessingException{
	// 	return appointmentService.getAppointment();
	// }

	@GetMapping("/getApp")
	public ResponseEntity<?> getAppoint(){
		List<Appointment> app = appointmentService.getAppointment();
		return ResponseEntity.ok(app);
	}
	

	@PostMapping("/addAppointment")
	public ResponseEntity<String> registerAppointmnet(@RequestBody Appointment appointment ){
		System.out.println("schedules size" + appointment.getSchedules().size());
		appointmentService.saveAppointment(appointment);
		return new ResponseEntity<>(appointment.getAppointment_id().toString(), HttpStatus.OK);
	}
	
	@GetMapping("/getAppId/{id}")
	public Appointment getAppById(@PathVariable Integer id) {
		return appointmentService.getAppById(id);
	}
	
	
	@GetMapping("/getAppById/{employee_id}")
	public ResponseEntity<List<ShowAppointment>> getShowApp(@PathVariable String employee_id)throws JsonProcessingException {
		User user = userService.getUserById(employee_id);
		List<Appointment> appointments = user.getAppointments();
		List<ShowAppointment> showAppointments = new ArrayList<ShowAppointment>();
		for(Appointment appointment : appointments) {
			ShowAppointment showAppointment = new ShowAppointment();
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
}


