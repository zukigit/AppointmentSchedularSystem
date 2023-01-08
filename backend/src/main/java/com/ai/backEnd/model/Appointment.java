package com.ai.backEnd.model;

import java.time.LocalDate;
import java.util.List;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Appointment{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer appointment_id;
	private String title;
	private String description;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd/MM/yyyy")
	private LocalDate created_date;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd/MM/yyyy")
	private LocalDate updated_date;
	private boolean isDeleted;
	@Enumerated(EnumType.STRING)
	private AppointmentType type;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
	  name = "user_appointment", 
	  joinColumns = @JoinColumn(name = "appointment_id"), 
	  inverseJoinColumns = @JoinColumn(name = "employee_id"))
	private List<User> employee;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "appCreated_userId")
	private User createUser;
	
	public Integer getAppointment_id() {
		return appointment_id;
	}
	public void setAppointment_id(Integer appointment_id) {
		this.appointment_id = appointment_id;
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
	public LocalDate getCreated_date() {
		return created_date;
	}
	public void setCreated_date(LocalDate created_date) {
		this.created_date = created_date;
	}
	public LocalDate getUpdated_date() {
		return updated_date;
	}
	public void setUpdated_date(LocalDate updated_date) {
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
	public List<User> getEmployee() {
		return employee;
	}
	public void setEmployee(List<User> employee) {
		this.employee = employee;
	}
	public User getCreateUser() {
		return createUser;
	}
	public void setCreateUser(User createUser) {
		this.createUser = createUser;
	}
}
