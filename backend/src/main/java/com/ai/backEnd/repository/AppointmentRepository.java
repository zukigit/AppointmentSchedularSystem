package com.ai.backEnd.repository;

import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.Schedule;
import com.ai.backEnd.model.User;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

	@Query("SELECT a.description From Appointment a")
	List<Appointment> getAll();

	@Query("SELECT a FROM Appointment a JOIN a.employee e WHERE e.employee_id IN (:user_ids)")
	List<Appointment> getByUserList(List<String> user_ids);

	@Query("SELECT a FROM Appointment a JOIN a.schedules s WHERE s.date IN (:dates) AND s.end_time > :start_time AND s.start_time < :end_time")
	List<Appointment> getByScheduleList(List<LocalDate> dates, LocalTime start_time, LocalTime end_time);
}
