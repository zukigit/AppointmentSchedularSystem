package com.ai.backEnd.serviceImpl;

import com.ai.backEnd.dto.ShowAppointment;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.Schedule;
import com.ai.backEnd.repository.AppointmentRepository;
import com.ai.backEnd.service.AppointmentService;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository repo;
    
    @Override
    public Appointment saveAppointment(Appointment appointment) {
        return repo.save(appointment);
    }
    @Override
    public List<Appointment> getAppointment() {
        return repo.findAll();
    }
	@Override
	public Appointment getAppById(Integer id) {
		return repo.findById(id).get();
	}

    
    @Override
    public List<Appointment> getAll() {
   
        return repo.getAll();
    }
	@Override
	public List<Appointment> getByUserList(List<String> user_ids) {
		return repo.getByUserList(user_ids);
	}

	
	@Override
	public List<Appointment> getByScheduleList(List<Schedule> schedules) {
		List<LocalDate> dates = new ArrayList<>();
		LocalTime start_time = schedules.get(0).getStart_time();
		LocalTime end_time = schedules.get(0).getEnd_time();
		List<Appointment> timeCheckedAppointments = new ArrayList<>();
		
		for(Schedule schedule : schedules) {
			dates.add(schedule.getDate());
		}
		
		List<Appointment> timeUncheckedAppointments = repo.getByScheduleList(dates);
		
		for(Appointment appointment : timeUncheckedAppointments) {
			List<Schedule> tempSchedules = appointment.getSchedules();
			LocalTime temp_start_time = tempSchedules.get(0).getStart_time();
			LocalTime temp_end_time = tempSchedules.get(0).getEnd_time();
			
			if(temp_end_time.isAfter(start_time) && temp_start_time.isBefore(end_time)) {
				timeCheckedAppointments.add(appointment);
			}
		}
		return timeCheckedAppointments;
	}
	@Override
	public void updateAppointment(Appointment app) {
		repo.save(app);
	}
}
