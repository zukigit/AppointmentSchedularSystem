package com.ai.backEnd.model;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class Appointment {
	
	@Id
	private int appointent_id;
	private String title;
	private String description;
	@DateTimeFormat(pattern = "yyyy-mm-dd'T'HH:mm")
	private LocalDateTime created_date;
	@DateTimeFormat(pattern = "yyyy-mm-dd'T'HH:mm")
	private LocalDateTime updated_date;
	private boolean isDeleted;
	@Enumerated(EnumType.STRING)
	private AppointmentType type;
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_appointment",
            joinColumns = {
                    @JoinColumn(name = "appointment_id",
                            nullable = false, updatable = false)},
            inverseJoinColumns = {
                    @JoinColumn(name = "employee_id", 
                            nullable = false, updatable = false)})
	private Set<User> employee_id;
	
	
	
	public int getAppointent_id() {
		return appointent_id;
	}
	public void setAppointent_id(int appointent_id) {
		this.appointent_id = appointent_id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public LocalDateTime getCreated_date() {
		return created_date;
	}
	public void setCreated_date(LocalDateTime created_date) {
		this.created_date = created_date;
	}
	public LocalDateTime getUpdated_date() {
		return updated_date;
	}
	public void setUpdated_date(LocalDateTime updated_date) {
		this.updated_date = updated_date;
	}
	public boolean isDeleted() {
		return isDeleted;
	}
	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	public AppointmentType getType() {
		return type;
	}
	public void setType(AppointmentType type) {
		this.type = type;
	}
	public Set<User> getEmployee_id() {
		return employee_id;
	}
	public void setEmployee_id(Set<User> employee_id) {
		this.employee_id = employee_id;
	}
	
	
}
