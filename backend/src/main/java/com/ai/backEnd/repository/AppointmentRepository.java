package com.ai.backEnd.repository;

import com.ai.backEnd.dto.ShowAppointment;
import com.ai.backEnd.model.Appointment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Integer> {

    @Query("SELECT a From Appointment a")
    List<Appointment> getAll();
    
}
