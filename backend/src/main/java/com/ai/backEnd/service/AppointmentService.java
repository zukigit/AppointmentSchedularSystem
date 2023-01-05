package com.ai.backEnd.service;

import java.util.List;

import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.Schedules;


public interface AppointmentService {

    Appointment saveAppointment(Appointment appointment);

    List<Appointment> getAppointment();

    Appointment getAppById(Integer id);
    
	
}
