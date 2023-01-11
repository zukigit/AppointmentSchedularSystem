package com.ai.backEnd.serviceImpl;

import com.ai.backEnd.dto.ShowAppointment;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.repository.AppointmentRepository;
import com.ai.backEnd.service.AppointmentService;

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
        // TODO Auto-generated method stub
        return repo.getAll();
    }
   
}
