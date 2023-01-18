package com.ai.backEnd.model;

import java.time.LocalDate;
import java.util.List;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Appointment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer appointment_id;
	private String title;
	private String description;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="MM/dd/yyyy")
	private LocalDate created_date;
	private boolean isDeleted;
	@Enumerated(EnumType.STRING)
	private AppointmentType type;
	@ManyToMany
	@JoinTable(
	  joinColumns = @JoinColumn(name = "appointment_id"), 
	  inverseJoinColumns = @JoinColumn(name = "employee_id"))
	private List<User> employee;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "appCreated_userId")
	private User createUser;
	@OneToMany( fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Schedule> schedules;
	@OneToMany( fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<AppointmentFile> files;
	
	public User getCreateUser() {
		return createUser;
	}
	public void setCreateUser(User createUser) {
		this.createUser = createUser;
	}
	public List<Schedule> getSchedules() {
		return schedules;
	}
	public void setSchedules(List<Schedule> schedules) {
		this.schedules = schedules;
	}
	public List<AppointmentFile> getFiles() {
		return files;
	}
	public void setFiles(List<AppointmentFile> files) {
		this.files = files;
	}
	public List<User> getEmployee() {
		return employee;
	}
	public void setEmployee(List<User> employee) {
		this.employee = employee;
	}
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
}
