package com.ai.backEnd.serviceImpl;

import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.Schedule;
import com.ai.backEnd.repository.AppointmentRepository;
import com.ai.backEnd.service.AppointmentService;

import java.time.LocalDate;
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
		return repo.getByScheduleList(schedules);
	} 
}
