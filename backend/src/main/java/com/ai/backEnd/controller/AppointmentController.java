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
import com.ai.backEnd.model.Schedule;
import com.ai.backEnd.serviceImpl.AppointmentImpl;
import com.fasterxml.jackson.core.JsonProcessingException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class AppointmentController {

    @Autowired
    private AppointmentImpl appointmentService;

	@GetMapping("/getApp")
	public ResponseEntity<List<Appointment>> getAppoint(){
		List<Appointment> app = appointmentService.getAppointment();
		return ResponseEntity.ok(app);
	}
	

	@PostMapping("/addAppointment")
	public ResponseEntity<String> registerAppointmnet(@RequestBody Appointment appointment ){
		appointmentService.saveAppointment(appointment);
		return new ResponseEntity<>(appointment.getAppointment_id().toString(), HttpStatus.OK);
	}
	
	@GetMapping("/getAppId/{id}")
	public Appointment getAppById(@PathVariable Integer id) {
		return appointmentService.getAppById(id);
	}
	
	
	@GetMapping("/getAppById/{employee_id}")
	public ResponseEntity<List<ShowAppointment>> getShowApp(@PathVariable String employee_id)throws JsonProcessingException {
		List<ShowAppointment> showAppointments = new ArrayList<ShowAppointment>();
		List<String> user_ids = new ArrayList<>(List.of(employee_id));
		List<Appointment> appointments = appointmentService.getByUserList(user_ids);
		
		for(Appointment appointment : appointments) {
			ShowAppointment showAppointment = new ShowAppointment();
			showAppointment.setTitle(appointment.getTitle());
			List<LocalDate> compareDateList = new ArrayList<>();
			showAppointment.setDescription(appointment.getDescription());
			showAppointment.setType(appointment.getType());
			showAppointment.setCreateUser(appointment.getCreateUser());
			List<Schedule> schedules = appointment.getSchedules();
			showAppointment.setStart_time(schedules.get(0).getStart_time());
			showAppointment.setEnd_time(schedules.get(0).getEnd_time());
			
			for (Schedule schedule : schedules) {
				compareDateList.add(schedule.getDate());
				
			}
	
			showAppointment.setStart_date(Collections.min(compareDateList));
			showAppointment.setEnd_date(Collections.max(compareDateList));
			showAppointments.add(showAppointment);
		}
		return new ResponseEntity<List<ShowAppointment>>(showAppointments, HttpStatus.OK);
	}

	

	@GetMapping("/getAll")
	public List<Appointment> getAll(){
		return appointmentService.getAll();
	}
}


