package com.ai.backEnd.serviceImpl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.ai.backEnd.model.Schedule;
import com.ai.backEnd.repository.ScheduleRepository;

@SpringBootTest
class ScheduleImplTest {
	
	@Mock
	ScheduleRepository scheduleRepository;
	
	@InjectMocks
	ScheduleImpl scheduleImpl;

	@BeforeEach
	void setUp() throws Exception {
	}
	
	
	
	@Test
	void testSaveSchedule() {
		
		Schedule schedule=new Schedule();
		LocalDate date=LocalDate.of(2022, 1, 3);
		LocalTime starttime=LocalTime.of(10, 30);
		LocalTime endTime=LocalTime.of(11, 30);
		schedule.setId(001);
		schedule.setDate(date);
		schedule.setEnd_time(endTime);
		schedule.setStart_time(starttime);
		
		when(scheduleRepository.save(any(Schedule.class))).thenReturn(schedule);
		Schedule savedSchedule=scheduleRepository.save(schedule);
		assertThat(savedSchedule.getId()).isNotNull();
		
		
	}

	@Test
	void testGetSchedules() {
		
		

		LocalDate date=LocalDate.of(2022, 1, 3);
		LocalTime starttime=LocalTime.of(10, 30);
		LocalTime endTime=LocalTime.of(11, 30);
		List<Schedule> list=new ArrayList<Schedule>();
		
		Schedule schedule=new Schedule();
		schedule.setId(001);
		schedule.setDate(date);
		schedule.setEnd_time(endTime);
		schedule.setStart_time(starttime);
		
		
		LocalTime starttime1=LocalTime.of(8, 30);
		LocalTime endTime1=LocalTime.of(9, 30);
		Schedule schedule1=new Schedule();
		schedule1.setId(002);
		schedule1.setDate(date);
		schedule1.setEnd_time(starttime1);
		schedule1.setStart_time(endTime1);
		
		  list.add(schedule);
	      list.add(schedule1);
	      when(scheduleRepository.findAll()).thenReturn(list);

	      List<Schedule> ScheduleList = scheduleImpl.getSchedules();
	      assertThat(ScheduleList.size()).isGreaterThan(0);
		
		
	}

	@Test
	void testGetScheduleById() {
		
		LocalDate date=LocalDate.of(2022, 1, 3);
		LocalTime starttime=LocalTime.of(10, 30);
		LocalTime endTime=LocalTime.of(11, 30);
		Schedule schedule=new Schedule();
		schedule.setId(001);
		schedule.setDate(date);
		schedule.setEnd_time(starttime);
		schedule.setStart_time(endTime);
		
		when(scheduleRepository.findById(001)).thenReturn(Optional.of(schedule));
		assertThat(schedule).isNotNull();
		assertEquals(001,schedule.getId());
		
	}

}
