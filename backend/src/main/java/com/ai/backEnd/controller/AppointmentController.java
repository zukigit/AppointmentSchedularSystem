package com.ai.backEnd.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ai.backEnd.dto.ShowAppointment;
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
	public Appointment registerAppointmnet(@RequestBody Appointment appointment ){
		System.out.println("schedules size" + appointment.getSchedules().size());
		appointmentService.saveAppointment(appointment);
		return appointment;
	}
	
	@GetMapping("/getAppById")
	public Appointment getAppById(Integer id) {
		return appointmentService.getAppById(id);
	}

	@GetMapping("/showApp")
	public List<ShowAppointment> showAppointment(){
		return appointmentService.showAppointment();
	}

	@GetMapping("/getAll")
	public List<Appointment> getAll(){
		return appointmentService.getAll();
	}
}


