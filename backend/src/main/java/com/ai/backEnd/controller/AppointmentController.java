package com.ai.backEnd.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ai.backEnd.dto.AppointmentAddingModel;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.Schedules;
import com.ai.backEnd.serviceImpl.AppointmentImpl;
import com.ai.backEnd.serviceImpl.ScheduleImpl;
import com.ai.backEnd.serviceImpl.UserImpl;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class AppointmentController {

    @Autowired
    private AppointmentImpl service;

	@Autowired
	private ScheduleImpl scheService;

	@Autowired
	private UserImpl userService;

    
    @PostMapping("/saveAppointment" )
	public void saveAppointment(@RequestBody Appointment appointment) {
			service.saveAppointment(appointment);
		}

    @GetMapping("/getApp")
	public List<Appointment> getAppointment(){
		return service.getAppointment();
	}

	@PostMapping("/addAppointment")
	public void registerAppointmnet(@RequestBody AppointmentAddingModel dto ){
	Appointment app = new Appointment();
	Schedules sch = new Schedules();
	sch.setAppointment(app);
	scheService.saveSchedule(sch);

	}
	
	@GetMapping("/getAppById")
	public Appointment getAppById(Integer id) {
		return service.getAppById(id);
	}
	
	
}


