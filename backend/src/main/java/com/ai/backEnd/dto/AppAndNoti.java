package com.ai.backEnd.dto;

import java.util.List;

import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.Notification;
import com.ai.backEnd.model.User;

public class AppAndNoti {
    
    private int id;
    private Appointment ap;
	private User user;
	private String currentuser;
	private String invitedUser;
	private String status;
    private String description;







    public Appointment getAp() {
        return ap;
    }
    public void setAp(Appointment ap) {
        this.ap = ap;
    }
    
    public String getCurrentuser() {
        return currentuser;
    }
    public void setCurrentuser(String currentuser) {
        this.currentuser = currentuser;
    }
    public String getInvitedUser() {
        return invitedUser;
    }
    public void setInvitedUser(String invitedUser) {
        this.invitedUser = invitedUser;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    



    
}
