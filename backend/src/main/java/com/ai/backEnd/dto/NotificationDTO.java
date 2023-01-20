package com.ai.backEnd.dto;

import com.ai.backEnd.model.User;

public class NotificationDTO {
	
	private int id;
	private String title;
	private User createUser;
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
	
	

}
