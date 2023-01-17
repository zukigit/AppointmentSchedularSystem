package com.ai.backEnd.serviceImpl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.AppointmentType;
import com.ai.backEnd.model.Team;
import com.ai.backEnd.model.User;
import com.ai.backEnd.model.UserImage;
import com.ai.backEnd.model.UserRole;
import com.ai.backEnd.repository.AppointmentRepository;




@SpringBootTest
class AppointmentImplTest {

	@Mock
	AppointmentRepository appointmentRepository;
	
	
	@InjectMocks
	AppointmentImpl appointmentImpl;
	
	
	
//	@BeforeEach
//	void setUp() throws Exception {
//	}
	
//	@Mock
//	AppointmentRepository appointmentRepository;
//	
//	
//	@InjectMocks
//	AppointmentImpl appointmentService;

	@Test
	void testSaveAppointment() {
		LocalDate date = LocalDate.of(2022, 1, 8);
		AppointmentType type=AppointmentType.PUBLIC;
		UserRole role = UserRole.ADMIN;
		Team team= new Team();
		team.setTeam_id("15");
		UserImage userImage=new UserImage();
		userImage.setImage_id(113);
		User user=new User(); 
		user.setEmployee_id("EE00");
		user.setName("Mg Mg");
		user.setPassword("123123");
		user.setUserImage(userImage);
		user.setPhone_number("0988");
		user.setGender("male");
		user.setPosition("Manager");
		user.setRole(role);
		user.setTeam(team);
		user.setAccountNonExpired(true);
		user.setAccountNonLocked(true);
		user.setEnabled(true);
		Appointment appointment=new Appointment();
		appointment.setAppointment_id(001);
		appointment.setCreated_date(date);
		appointment.setDescription("This is Important Appointment");
		appointment.setDeleted(true);
		appointment.setTitle("Department Level Meeting");
		appointment.setType(type);
		appointment.setCreateUser(user);
		
		
		when(appointmentRepository.save(any(Appointment.class))).thenReturn(appointment);
		Appointment savedAppointment=appointmentRepository.save(appointment);
		assertThat(savedAppointment.getTitle()).isNotNull();

	}

	

	@Test
	void testGetAppointment() {
		
//		 List<Team> list=new ArrayList<Team>();
		LocalDate date = LocalDate.of(2022, 1, 8);
		AppointmentType type=AppointmentType.PUBLIC;
		UserRole role = UserRole.ADMIN;
		Team team= new Team();
		team.setTeam_id("15");
		UserImage userImage=new UserImage();
		userImage.setImage_id(113);
		User user=new User(); 
		user.setEmployee_id("EE00");
		user.setName("Mg Mg");
		user.setPassword("123123");
		user.setUserImage(userImage);
		user.setPhone_number("0988");
		user.setGender("male");
		user.setPosition("Manager");
		user.setRole(role);
		user.setTeam(team);
		user.setAccountNonExpired(true);
		user.setAccountNonLocked(true);
		user.setEnabled(true);
		List<Appointment> list=new ArrayList<Appointment>();
		
		 Appointment appointment=new Appointment();
			appointment.setAppointment_id(001);
			appointment.setCreated_date(date);
			appointment.setDescription("This is Important Appointment");
			appointment.setDeleted(true);
			appointment.setTitle("Department Level Meeting");
			appointment.setType(type);
			appointment.setCreateUser(user);
			
			
			LocalDate date1 = LocalDate.of(2022, 1, 8);
			AppointmentType type1=AppointmentType.PUBLIC;
			UserRole role1 = UserRole.ADMIN;
			Team team1= new Team();
			team.setTeam_id("15");
			UserImage userImage1=new UserImage();
			userImage.setImage_id(113);
			User user1=new User(); 
			user.setEmployee_id("EE00");
			user.setName("Mg Mg");
			user.setPassword("123123");
			user.setUserImage(userImage1);
			user.setPhone_number("0988");
			user.setGender("male");
			user.setPosition("Manager");
			user.setRole(role1);
			user.setTeam(team1);
			user.setAccountNonExpired(true);
			user.setAccountNonLocked(true);
			user.setEnabled(true);
		 Appointment appointment1=new Appointment();
			appointment1.setAppointment_id(001);
			appointment1.setCreated_date(date1);
			appointment1.setDescription("This is Important Appointment");
			appointment1.setDeleted(true);
			appointment1.setTitle("Department Level Meeting");
			appointment1.setType(type1);
			appointment1.setCreateUser(user1);
			
		 list.add(appointment);
		 list.add(appointment1);
		 when(appointmentRepository.findAll()).thenReturn(list);

		List<Appointment> appList = appointmentImpl.getAppointment();
		assertThat(appList.size()).isGreaterThan(0);
			
	}
//
	@Test
	void testGetAppById() {
		
		LocalDate date = LocalDate.of(2022, 1, 8);
		AppointmentType type=AppointmentType.PUBLIC;
		UserRole role = UserRole.ADMIN;
		Team team= new Team();
		team.setTeam_id("15");
		UserImage userImage=new UserImage();
		userImage.setImage_id(113);
		User user=new User(); 
		user.setEmployee_id("EE00");
		user.setName("Mg Mg");
		user.setPassword("123123");
		user.setUserImage(userImage);
		user.setPhone_number("0988");
		user.setGender("male");
		user.setPosition("Manager");
		user.setRole(role);
		user.setTeam(team);
		user.setAccountNonExpired(true);
		user.setAccountNonLocked(true);
		user.setEnabled(true);
        Appointment appointment=new Appointment();
		appointment.setAppointment_id(001);
		appointment.setCreated_date(date);
		appointment.setDescription("This is Important Appointment");
		appointment.setDeleted(true);
		appointment.setTitle("Department Level Meeting");
		appointment.setType(type);
		appointment.setCreateUser(user);
		
		
		when(appointmentRepository.findById(001)).thenReturn(Optional.of(appointment));
		assertThat(appointment).isNotNull();
		assertThat(appointment.getAppointment_id()).isNotNull();
		
	}
//
//	@Test
//	void testGetAll() {
//		LocalDate date = LocalDate.of(2022, 1, 8);
//		AppointmentType type=AppointmentType.PUBLIC;
//		UserRole role = UserRole.ADMIN;
//		Team team= new Team();
//		team.setTeam_id("15");
//		UserImage userImage=new UserImage();
//		userImage.setImage_id(113);
//		User user=new User(); 
//		user.setEmployee_id("EE00");
//		user.setName("Mg Mg");
//		user.setPassword("123123");
//		user.setUserImage(userImage);
//		user.setPhone_number("0988");
//		user.setGender("male");
//		user.setPosition("Manager");
//		user.setRole(role);
//		user.setTeam(team);
//		user.setAccountNonExpired(true);
//		user.setAccountNonLocked(true);
//		user.setEnabled(true);
//		List<Appointment> list=new ArrayList<Appointment>();
//		
//		 Appointment appointment=new Appointment();
//			appointment.setAppointment_id(001);
//			appointment.setCreated_date(date);
//			appointment.setDescription("This is Important Appointment");
//			appointment.setDeleted(true);
//			appointment.setTitle("Department Level Meeting");
//			appointment.setType(type);
//			appointment.setCreateUser(user);
//			
//			
//			LocalDate date1 = LocalDate.of(2022, 1, 8);
//			AppointmentType type1=AppointmentType.PUBLIC;
//			UserRole role1 = UserRole.ADMIN;
//			Team team1= new Team();
//			team.setTeam_id("15");
//			UserImage userImage1=new UserImage();
//			userImage.setImage_id(113);
//			User user1=new User(); 
//			user.setEmployee_id("EE00");
//			user.setName("Mg Mg");
//			user.setPassword("123123");
//			user.setUserImage(userImage1);
//			user.setPhone_number("0988");
//			user.setGender("male");
//			user.setPosition("Manager");
//			user.setRole(role1);
//			user.setTeam(team1);
//			user.setAccountNonExpired(true);
//			user.setAccountNonLocked(true);
//			user.setEnabled(true);
//		 Appointment appointment1=new Appointment();
//			appointment1.setAppointment_id(001);
//			appointment1.setCreated_date(date1);
//			appointment1.setDescription("This is Important Appointment");
//			appointment1.setDeleted(true);
//			appointment1.setTitle("Department Level Meeting");
//			appointment1.setType(type1);
//			appointment1.setCreateUser(user1);
//			
//		 list.add(appointment);
//		 list.add(appointment1);
//		 when(appointmentRepository.getAll()).thenReturn(list);
//
//		    List<Appointment> appList = appointmentImpl.getAppointment();
//		    assertThat(appList.size()).isGreaterThan(0);
//		
//	}

//	@Test
//	void testGetByUserList() {
//		LocalDate date = LocalDate.of(2022, 1, 8);
//		AppointmentType type=AppointmentType.PUBLIC;
//		UserRole role = UserRole.ADMIN;
//		Team team= new Team();
//		team.setTeam_id("15");
//		UserImage userImage=new UserImage();
//		userImage.setImage_id(113);
//		User user=new User(); 
//		user.setEmployee_id("EE00");
//		user.setName("Mg Mg");
//		user.setPassword("123123");
//		user.setUserImage(userImage);
//		user.setPhone_number("0988");
//		user.setGender("male");
//		user.setPosition("Manager");
//		user.setRole(role);
//		user.setTeam(team);
//		user.setAccountNonExpired(true);
//		user.setAccountNonLocked(true);
//		user.setEnabled(true);
//		List<Appointment> appList=new ArrayList<Appointment>();
//		
//		 Appointment appointment=new Appointment();
//			appointment.setAppointment_id(001);
//			appointment.setCreated_date(date);
//			appointment.setDescription("This is Important Appointment");
//			appointment.setDeleted(true);
//			appointment.setTitle("Department Level Meeting");
//			appointment.setType(type);
//			appointment.setCreateUser(user);
//			
//			
//			LocalDate date1 = LocalDate.of(2022, 1, 8);
//			AppointmentType type1=AppointmentType.PUBLIC;
//			UserRole role1 = UserRole.ADMIN;
//			Team team1= new Team();
//			team.setTeam_id("15");
//			UserImage userImage1=new UserImage();
//			userImage.setImage_id(113);
//			User user1=new User(); 
//			user.setEmployee_id("EE00");
//			user.setName("Mg Mg");
//			user.setPassword("123123");
//			user.setUserImage(userImage1);
//			user.setPhone_number("0988");
//			user.setGender("male");
//			user.setPosition("Manager");
//			user.setRole(role1);
//			user.setTeam(team1);
//			user.setAccountNonExpired(true);
//			user.setAccountNonLocked(true);
//			user.setEnabled(true);
//		 Appointment appointment1=new Appointment();
//			appointment1.setAppointment_id(001);
//			appointment1.setCreated_date(date1);
//			appointment1.setDescription("This is Important Appointment");
//			appointment1.setDeleted(true);
//			appointment1.setTitle("Department Level Meeting");
//			appointment1.setType(type1);
//			appointment1.setCreateUser(user1);
//			
//		 appList.add(appointment);
//		 appList.add(appointment1);
//		 
//		 
//		 
//		 List<User> userList=new ArrayList<User>();
//			UserRole role3 = UserRole.ADMIN;
//			
//			Team team3= new Team();
//			team.setTeam_id("15");
//			UserImage userImage3=new UserImage();
//			userImage.setImage_id(113);
//			
//			User user3=new User(); 
//			user3.setEmployee_id("EE00");
//			user3.setName("Mg Mg");
//			user3.setPassword("123123");
//			user3.setUserImage(userImage);
//			user3.setPhone_number("0988");
//			user3.setGender("male");
//			user3.setPosition("Manager");
//			user3.setRole(role);
//			user3.setTeam(team);
//			user3.setAccountNonExpired(true);
//			user3.setAccountNonLocked(true);
//			user3.setEnabled(true);
//			
//	UserRole role4 = UserRole.ADMIN;
//			
//			Team team4= new Team();
//			team1.setTeam_id("15");
//			UserImage userImage4=new UserImage();
//			userImage1.setImage_id(113);
//			
//			User user4=new User();
//			user4.setEmployee_id("EE11");
//			user4.setName("Mg Mg");
//			user4.setPassword("123123");
//			user4.setUserImage(userImage1);
//			user4.setPhone_number("0988");
//			user4.setGender("male");
//			user4.setPosition("Manager");
//			user4.setRole(role1);
//			user4.setTeam(team1);
//			user4.setAccountNonExpired(true);
//			user4.setAccountNonLocked(true);
//			user4.setEnabled(true);
//			
//			userList.add(user3);
//			userList.add(user4);
//			
//			List <String> listUser=userList;
//		// when(appointmentRepository.getByUserList(List<String> userList)).thenReturn(appList);
//			when(appointmentRepository.getByUserList( listUser)).thenReturn(appList);
//			List<Appointment> appList1 = appointmentImpl.getAppointment();
//			assertThat(appList1.size()).isGreaterThan(0);
//	}
	

//	@Test
//	void testGetByScheduleList() {
//		LocalDate date = LocalDate.of(2022, 1, 8);
//		AppointmentType type=AppointmentType.PUBLIC;
//		UserRole role = UserRole.ADMIN;
//		Team team= new Team();
//		team.setTeam_id("15");
//		UserImage userImage=new UserImage();
//		userImage.setImage_id(113);
//		User user=new User(); 
//		user.setEmployee_id("EE00");
//		user.setName("Mg Mg");
//		user.setPassword("123123");
//		user.setUserImage(userImage);
//		user.setPhone_number("0988");
//		user.setGender("male");
//		user.setPosition("Manager");
//		user.setRole(role);
//		user.setTeam(team);
//		user.setAccountNonExpired(true);
//		user.setAccountNonLocked(true);
//		user.setEnabled(true);
//		List<Appointment> appList=new ArrayList<Appointment>();
//		
//		 Appointment appointment=new Appointment();
//			appointment.setAppointment_id(001);
//			appointment.setCreated_date(date);
//			appointment.setDescription("This is Important Appointment");
//			appointment.setDeleted(true);
//			appointment.setTitle("Department Level Meeting");
//			appointment.setType(type);
//			appointment.setCreateUser(user);
//			
//			
//			LocalDate date1 = LocalDate.of(2022, 1, 8);
//			AppointmentType type1=AppointmentType.PUBLIC;
//			UserRole role1 = UserRole.ADMIN;
//			Team team1= new Team();
//			team.setTeam_id("15");
//			UserImage userImage1=new UserImage();
//			userImage.setImage_id(113);
//			User user1=new User(); 
//			user.setEmployee_id("EE00");
//			user.setName("Mg Mg");
//			user.setPassword("123123");
//			user.setUserImage(userImage1);
//			user.setPhone_number("0988");
//			user.setGender("male");
//			user.setPosition("Manager");
//			user.setRole(role1);
//			user.setTeam(team1);
//			user.setAccountNonExpired(true);
//			user.setAccountNonLocked(true);
//			user.setEnabled(true);
//		 Appointment appointment1=new Appointment();
//			appointment1.setAppointment_id(001);
//			appointment1.setCreated_date(date1);
//			appointment1.setDescription("This is Important Appointment");
//			appointment1.setDeleted(true);
//			appointment1.setTitle("Department Level Meeting");
//			appointment1.setType(type1);
//			appointment1.setCreateUser(user1);
//			
//		 appList.add(appointment);
//		 appList.add(appointment1);
//		 
//		 List<Schedule> scheduleList=new ArrayList<Schedule>();
//		 LocalDate date3=LocalDate.of(2022, 1, 3);
//			LocalTime starttime=LocalTime.of(10, 30);
//			LocalTime endTime=LocalTime.of(11, 30);
//			Schedule schedule=new Schedule();
//			schedule.setId(001);
//			schedule.setDate(date3);
//			schedule.setEnd_time(starttime);
//			schedule.setStart_time(endTime);
//			
//			 LocalDate date4=LocalDate.of(2022, 1, 3);
//				LocalTime starttime4=LocalTime.of(10, 30);
//				LocalTime endTime4=LocalTime.of(11, 30);
//				Schedule schedule4=new Schedule();
//				schedule.setId(001);
//				schedule.setDate(date4);
//				schedule.setEnd_time(starttime4);
//				schedule.setStart_time(endTime4);
//				
//				scheduleList.add(schedule);
//				scheduleList.add(schedule4);
//				
//			
//			
//		 
//		 when(appointmentRepository.getByScheduleList(scheduleList).thenReturn(Optional.of(appList));
////			when(appointmentRepository.getByUserList( listUser)).thenReturn(appList);
////			List<Appointment> appList1 = appointmentImpl.getAppointment();
////			assertThat(appList1.size()).isGreaterThan(0);
//	}

}
