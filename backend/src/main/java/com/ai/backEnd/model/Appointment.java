package com.ai.backEnd.model;


import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Appointment implements Serializable  {

	public static long serializeuId=1L;

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
	@ManyToMany()
	@JsonIgnore
	@JoinTable(
	  name = "user_appointment", 
	  joinColumns = @JoinColumn(name = "appointment_id"), 
	  inverseJoinColumns = @JoinColumn(name = "employee_id"))
	private Set<User> employee;
	@ManyToOne()
	@JoinColumn(name = "appCreated_userId")
	private User createUser;
	@OneToMany( cascade = CascadeType.ALL)
	private List<Schedule> schedules;
	@OneToMany( cascade = CascadeType.ALL)
	private List<AppointmentFile> files;
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
	public Set<User> getEmployee() {
		return employee;
	}
	public void setEmployee(Set<User> employee) {
		this.employee = employee;
	}
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
	public Appointment(Integer appointment_id, String title, String description, LocalDate created_date,
			LocalDate updated_date, boolean isDeleted, AppointmentType type, Set<User> employee, User createUser,
			List<Schedule> schedules, List<AppointmentFile> files) {
		this.appointment_id = appointment_id;
		this.title = title;
		this.description = description;
		this.created_date = created_date;
		this.updated_date = updated_date;
		this.isDeleted = isDeleted;
		this.type = type;
		this.employee = employee;
		this.createUser = createUser;
		this.schedules = schedules;
		this.files = files;
	}
	
	public Appointment(){

	}
}
