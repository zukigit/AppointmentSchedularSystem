package com.ai.backEnd.service;

import java.time.LocalDate;
import java.util.List;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.Schedule;

public interface AppointmentService {

    Appointment saveAppointment(Appointment appointment);

    List<Appointment> getAppointment();

    Appointment getAppById(Integer id);

	List<Appointment> getAll();
    
	List<Appointment> getByUserList(List<String> user_ids);
	
	List<Appointment> getByScheduleList(List<Schedule> schedules);
}
