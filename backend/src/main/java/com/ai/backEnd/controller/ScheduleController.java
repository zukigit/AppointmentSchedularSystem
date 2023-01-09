package com.ai.backEnd.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.Schedule;
import com.ai.backEnd.model.User;
import com.ai.backEnd.serviceImpl.AppointmentImpl;
import com.ai.backEnd.serviceImpl.ScheduleImpl;
import com.ai.backEnd.serviceImpl.UserImpl;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class ScheduleController {

    @Autowired
    private ScheduleImpl scheduleService;
    
    @Autowired
    private AppointmentImpl appointmentService;
    
    @Autowired
    private UserImpl userService;

//    @PostMapping("/saveSchedule")
//    public void saveSchedule(@RequestBody Schedule schedule){
//    	Appointment appointment = schedule.getAppointment();
//    	appointment.setAppointment_id(schedule.getId());
//    	Set<User> users = appointment.getEmployee();
//    	for(User user: users) {
//    		User newUser = userService.getUserById(user.getEmployee_id());
//    		user.setTeam(newUser.getTeam());
//    	}
//    	appointmentService.saveAppointment(appointment);
//    	scheduleService.saveSchedule(schedule);
//    }

    @GetMapping("/getSchedules")
    public List<Schedule> getAllSchedules(){
        return scheduleService.getSchedules();
    }
    
    @GetMapping("/getScheduleById/{id}")
	public Schedule getScheduleById(@PathVariable Integer id){
		return scheduleService.getScheduleById(id);
	}

}
