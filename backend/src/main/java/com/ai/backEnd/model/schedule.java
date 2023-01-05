package com.ai.backEnd.model;

import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class schedule {
	
	@Id
	private int id;
	@DateTimeFormat(pattern = "yyyy-mm-dd'T'HH:mm")
	private LocalDateTime date; 
	@DateTimeFormat(pattern = "yyyy-mm-dd'T'HH:mm")
	private  LocalDateTime start_time;
	@DateTimeFormat(pattern = "yyyy-mm-dd'T'HH:mm")
	private LocalDateTime end_time;
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "appointment_id", nullable = false)
	private Appointment appointment_id;
	
	private Appointment app;
	
	public Appointment getApp() {
		return app;
	}
	public void setApp(Appointment app) {
		this.app = app;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	public LocalDateTime getStart_time() {
		return start_time;
	}
	public void setStart_time(LocalDateTime start_time) {
		this.start_time = start_time;
	}
	public LocalDateTime getEnd_time() {
		return end_time;
	}
	public void setEnd_time(LocalDateTime end_time) {
		this.end_time = end_time;
	}
	public Appointment getAppointment_id() {
		return appointment_id;
	}
	public void setAppointment_id(Appointment appointment_id) {
		this.appointment_id = appointment_id;
	}
	
}
