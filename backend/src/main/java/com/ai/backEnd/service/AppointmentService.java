package com.ai.backEnd.service;

import java.util.List;
import com.ai.backEnd.model.Appointment;



public interface AppointmentService {

    Appointment saveAppointment(Appointment appointment);

    List<Appointment> getAppointment();

    Appointment getAppById(Integer id);

	List<Appointment> getAll();
    
}
