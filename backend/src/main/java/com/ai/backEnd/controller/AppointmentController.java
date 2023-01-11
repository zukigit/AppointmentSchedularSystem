package com.ai.backEnd.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.serviceImpl.AppointmentImpl;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class AppointmentController {

    @Autowired
    private AppointmentImpl appointmentService;

    @GetMapping("/getApp")
	public List<Appointment> getAppointment(){
		return appointmentService.getAppointment();
	}

	@PostMapping("/addAppointment")
	public ResponseEntity<String> registerAppointmnet(@RequestBody Appointment appointment ){
		System.out.println("schedules size" + appointment.getSchedules().size());
		appointmentService.saveAppointment(appointment);
		return new ResponseEntity<>(appointment.getAppointment_id().toString(), HttpStatus.OK);
	}
	
	@GetMapping("/getAppById")
	public Appointment getAppById(Integer id) {
		return appointmentService.getAppById(id);
	}
}


