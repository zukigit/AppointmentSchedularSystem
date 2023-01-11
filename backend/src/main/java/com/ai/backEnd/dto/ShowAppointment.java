package com.ai.backEnd.dto;

import java.util.List;

import com.ai.backEnd.model.AppointmentType;
import com.ai.backEnd.model.Schedule;
import com.ai.backEnd.model.User;

public class ShowAppointment {

    private String title;
    private String description;
    private AppointmentType type;
    private User createUser;
    private List<Schedule> schedules;

    public ShowAppointment(String title, String description, AppointmentType type) {
        this.title = title;
        this.description = description;
        this.type = type;
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
    public AppointmentType getType() {
        return type;
    }
    public void setType(AppointmentType type) {
        this.type = type;
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

    


    
}
