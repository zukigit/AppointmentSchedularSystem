package com.ai.backEnd.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ai.backEnd.dto.ImageUploadModel;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.AppointmentFile;
import com.ai.backEnd.service.AppointmentService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class FileController {

	@Autowired
	private AppointmentService appointmentService;
	
	@PostMapping("/uploadFile")
	public ResponseEntity<String> addFiles(@RequestParam("files") MultipartFile[] files, @RequestParam("appointmentId") String appointmentId) throws IOException{
		
		System.out.println("app id" + appointmentId);
		Appointment appointment = appointmentService.getAppById(Integer.parseInt(appointmentId));
		List<AppointmentFile> attFiles = appointment.getFiles();
		
		for(MultipartFile file : files) {
			AppointmentFile appointmentFile = new AppointmentFile();
			appointmentFile.setFile_name(file.getOriginalFilename());
			appointmentFile.setFile_content_type(file.getContentType());
			appointmentFile.setData(file.getBytes());
			attFiles.add(appointmentFile);
		}

		appointmentService.saveAppointment(appointment);
		return new ResponseEntity<>("added", HttpStatus.OK);
	}
}
