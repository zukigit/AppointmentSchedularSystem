package com.ai.backEnd.dto;

import java.time.LocalTime;

import com.ai.backEnd.model.UserRole;

public class ReportDTO {
	    String name;
	    String appointment_id;
	    String date;
	    String description;
	    String title;
	    String type;
	    String app_created_user_id;
	    LocalTime start_time;
	    LocalTime end_time;
	    
	    
		public LocalTime getStart_time() {
			return start_time;
		}
		public void setStart_time(LocalTime start_time) {
			this.start_time = start_time;
		}
		public LocalTime getEnd_time() {
			return end_time;
		}
		public void setEnd_time(LocalTime end_time) {
			this.end_time = end_time;
		}
		public String getAppointment_id() {
			return appointment_id;
		}
		public void setAppointment_id(String appointment_id) {
			this.appointment_id = appointment_id;
		}
		
		public String getDate() {
			return date;
		}
		public void setDate(String date) {
			this.date = date;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		public String getType() {
			return type;
		}
		public void setType(String type) {
			this.type = type;
		}
		public String getApp_created_user_id() {
			return app_created_user_id;
		}
		public void setApp_created_user_id(String app_created_user_id) {
			this.app_created_user_id = app_created_user_id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
	    
	    
	    

}
