package com.ai.backEnd.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ai.backEnd.model.Schedule;
import com.ai.backEnd.serviceImpl.ScheduleImpl;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class ScheduleController {

    @Autowired
    private ScheduleImpl scheduleService;

    @GetMapping("/getSchedules")
    public List<Schedule> getAllSchedules(){
        return scheduleService.getSchedules();
    }
    
    @GetMapping("/getScheduleById/{id}")
	public Schedule getScheduleById(@PathVariable Integer id){
		return scheduleService.getScheduleById(id);
	}
    

    @DeleteMapping("/deleteScheduleById/{id}")
    public void deleteScheduleById(@PathVariable Integer id){
        scheduleService.deleteScheduleById(id);
    }

}
