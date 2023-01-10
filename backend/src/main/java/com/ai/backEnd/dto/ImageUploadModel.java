package com.ai.backEnd.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class ImageUploadModel {

	private String appointmentId;
	private List<MultipartFile> files;
	
	public String getAppointmentId() {
		return appointmentId;
	}
	public void setAppointmentId(String appointmentId) {
		this.appointmentId = appointmentId;
	}
	public List<MultipartFile> getFiles() {
		return files;
	}
	public void setFiles(List<MultipartFile> files) {
		this.files = files;
	}
}
