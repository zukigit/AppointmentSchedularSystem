package com.ai.backEnd.service;

import java.time.LocalDate;
import java.util.List;

import com.ai.backEnd.model.Appointment;

public interface ReportService {
	
	public List<Appointment> getAllUserService();
	
	List<Appointment> getRepoByUserId(List<String> user_ids);
}
