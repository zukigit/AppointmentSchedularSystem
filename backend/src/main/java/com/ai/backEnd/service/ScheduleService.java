package com.ai.backEnd.service;

import java.util.List;

import com.ai.backEnd.model.Schedules;

public interface ScheduleService {

    Schedules saveSchedule(Schedules schedule);

    List<Schedules> getSchedules();
    
    Schedules getScheduleById(Integer id);
    
}
