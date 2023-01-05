package com.ai.backEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ai.backEnd.model.Schedules;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedules,Integer>{
    
}
