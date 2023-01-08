package com.ai.backEnd.service;

import java.util.List;

import com.ai.backEnd.model.Schedule;

public interface ScheduleService {

    Schedule saveSchedule(Schedule schedule);

    List<Schedule> getSchedules();
    
    Schedule getScheduleById(Integer id);
    
}
