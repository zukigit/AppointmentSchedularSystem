package com.ai.backEnd.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.AppointmentType;
import com.ai.backEnd.model.Schedules;

public class AppointmentAddingModel implements Serializable {
	
	private static final long serialVersionUID = 1L;

    private Appointment app;
    private Schedules sch;
    
	public Appointment getApp() {
		return app;
	}
	public void setApp(Appointment app) {
		this.app = app;
	}
	public Schedules getSch() {
		return sch;
	}
	public void setSch(Schedules sch) {
		this.sch = sch;
	}
	
    
    
    
   
    
}
