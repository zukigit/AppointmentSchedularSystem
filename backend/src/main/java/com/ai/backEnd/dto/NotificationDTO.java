package com.ai.backEnd.dto;

import com.ai.backEnd.model.NotificationType;
import com.ai.backEnd.model.User;

public class NotificationDTO {
	
	private int id;
	private String title;
	private User createUser;
	private NotificationType notiType;
    private User removeUser;
    private int appointment_id;
    private Boolean isReaded;
    
	public int getAppointment_id() {
		return appointment_id;
	}
	public void setAppointment_id(int appointment_id) {
		this.appointment_id = appointment_id;
	}
	public Boolean getIsReaded() {
		return isReaded;
	}
	public void setIsReaded(Boolean isReaded) {
		this.isReaded = isReaded;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getCreateUser() {
		return createUser;
	}
	public void setCreateUser(User createUser) {
		this.createUser = createUser;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public NotificationType getNotiType() {
		return notiType;
	}
	public void setNotiType(NotificationType notiType) {
		this.notiType = notiType;
	}
	public User getRemoveUser() {
		return removeUser;
	}
	public void setRemoveUser(User removeUser) {
		this.removeUser = removeUser;
	}
	
	

}
