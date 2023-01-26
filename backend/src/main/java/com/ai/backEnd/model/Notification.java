package com.ai.backEnd.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Notification implements Serializable
{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(length=8129)
	private String description;

	private boolean isReaded=false;

	@Enumerated(EnumType.STRING)
	private NotificationType noti_type;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id")
	private User user;

	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="appointment_id")
    private Appointment Appointment;
    

	

	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	private String status;
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Appointment getAppointment() {
		return Appointment;
	}

	public void setAppointment(Appointment appointment) {
		Appointment = appointment;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public NotificationType getNoti_type() {
		return noti_type;
	}

	public void setNoti_type(NotificationType noti_type) {
		this.noti_type = noti_type;
	}

	public boolean isReaded() {
		return isReaded;
	}

	public void setReaded(boolean isReaded) {
		this.isReaded = isReaded;
	}
	
	
}
