package com.ai.backEnd.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ai.backEnd.model.Schedule;
import com.ai.backEnd.repository.ScheduleRepository;
import com.ai.backEnd.service.ScheduleService;

@Service
public class ScheduleImpl implements ScheduleService{

    @Autowired
    private ScheduleRepository repo;

    @Override
    public Schedule saveSchedule(Schedule schedule) {
        return repo.save(schedule);
    }

    @Override
    public List<Schedule> getSchedules() {
        return repo.findAll();
    }

    @Override
    public Schedule getScheduleById(Integer id) {
        return repo.findById(id).get();
    }
    
}
