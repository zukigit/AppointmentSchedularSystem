package com.ai.backEnd.controller;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.AppointmentFile;

import com.ai.backEnd.repository.FileRepository;
import com.ai.backEnd.service.AppointmentService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class FileController {

	@Autowired
	private AppointmentService appointmentService;
	
	@Autowired
	FileRepository fileRepo;
	
	@PostMapping("/uploadFile")
	public ResponseEntity<String> addFiles(@RequestParam("files") MultipartFile[] files, @RequestParam("appointmentId") String appointmentId) throws IOException{
		
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
	
	@GetMapping("/downloadFile")
	public ResponseEntity<byte[]> getImage(@RequestParam int fileId) throws IOException{
		AppointmentFile appointmentFile = fileRepo.findById(fileId).get();
		
		return new ResponseEntity<byte[]>(appointmentFile.getData(), HttpStatus.OK);
	}
}
