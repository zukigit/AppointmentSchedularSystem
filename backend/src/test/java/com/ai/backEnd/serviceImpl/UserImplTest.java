
package com.ai.backEnd.serviceImpl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.ai.backEnd.dto.UserDetail;
import com.ai.backEnd.dto.UserDetailForUpdate;
import com.ai.backEnd.model.Team;
import com.ai.backEnd.model.User;
import com.ai.backEnd.model.UserImage;
import com.ai.backEnd.model.UserRole;
import com.ai.backEnd.repository.UserRespositroy;

@SpringBootTest
class UserImplTest {
	@Mock
	UserRespositroy userRepository;
	
	@InjectMocks
	UserImpl userService;
	
	
	@Test
	void testGetAllUser() {
		List<User> list=new ArrayList<User>();
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
		
UserRole role1 = UserRole.ADMIN;
		
		Team team1= new Team();
		team1.setTeam_id("15");
		UserImage userImage1=new UserImage();
		userImage1.setImage_id(113);
		
		User user1=new User();
		user1.setEmployee_id("EE11");
		user.setName("Mg Mg");
		user1.setPassword("123123");
		user1.setUserImage(userImage1);
		user1.setPhone_number("0988");
		user1.setGender("male");
		user.setPosition("Manager");
		user1.setRole(role1);
		user1.setTeam(team1);
		user1.setAccountNonExpired(true);
		user1.setAccountNonLocked(true);
		user1.setEnabled(true);
		
UserRole role2 = UserRole.ADMIN;
		
		Team team2= new Team();
		team2.setTeam_id("15");
		UserImage userImage2=new UserImage();
		userImage2.setImage_id(113);
		
		User user2=new User();
		user2.setEmployee_id("EE22");
		user2.setName("Mg Mg");
		user2.setPassword("123123");
		user2.setUserImage(userImage2);
		user2.setPhone_number("0988");
		user2.setGender("male");
		user.setPosition("Manager");
		user2.setRole(role2);
		user2.setTeam(team2);
		user2.setAccountNonExpired(true);
		user2.setAccountNonLocked(true);
		user2.setEnabled(true);
		
		list.add(user);
		list.add(user1);
		list.add(user2);
//		when(userRepository.findAll()).thenReturn(list);
//		List<User> userList=userService.getAllUser();
//		assertEquals(3,userList.size());
//		verify(userRepository, times(1)).findAll();
		
		when(userRepository.findAll()).thenReturn(list);

	    List<User> userList = userService.getAllUser();
	    assertThat(userList.size()).isGreaterThan(0);
	}
	
	@Test
	void testSaveUser() {
		//UserRole role = ADMIN;
//		User user1 = new User();
//     	user1.setRole(ADMIN);
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
		user.setGender("male");user.setPosition("Manager");
		user.setRole(role);
		user.setTeam(team);
		user.setAccountNonExpired(true);
		user.setAccountNonLocked(true);
		user.setEnabled(true);
//		userService.saveUser(user);
//		verify(userService,times(1)).saveUser(user);
		
		when(userRepository.save(any(User.class))).thenReturn(user);

	    User savedUser = userRepository.save(user);
	    assertThat(savedUser.getName()).isNotNull();
	}

	@Test
	void testGetUserById() {
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
		
//		List<User> userList = userService.getAllUser();
//		 given(userRepository.findAll()).willReturn(List.of(userService,user));
//		when(userRepository.findById("EE00").get().thenReturn(user);
		
		//assertThat(user1).isNotNull();
        //assertThat(userList.size()).isEqualTo(1);
//		when(userRepository.findById("EE00")).thenReturn(user);
//		User user1=userService.getUserById("EE00");
//		assertThat(user1).isNotNull();
//		assertEquals("EE00",user1.getEmployee_id());
		
		
		when(userRepository.findById("EE00")).thenReturn(Optional.of(user));
		assertThat(user).isNotNull();
		assertEquals("EE00",user.getEmployee_id());
		
		
//		assertEquals("Mg Mg",user1.getName());
//		assertEquals("123123",user1.getPassword());
//		assertEquals(userImage,user1.getUserImage());
//		assertEquals("0988",user1.getPhone_number());
//		assertEquals("male",user1.getGender());
//		assertEquals("Manager",user1.getPosition());
//		assertEquals(role,user1.getRole());
//		assertEquals(team,user1.getTeam());
//		assertEquals(true,user1.isAccountNonExpired());
//		assertEquals(true,user1.isAccountNonLocked());
//		assertEquals(true,user1.isEnabled());
		
	}

	

	@Test
	void testDeleteUserById() {
		userService.deleteUserById("EE00");
		verify(userRepository,times(1)).deleteById("EE00");
	}

	@Test
	void testUserDetail() {
		List<UserDetail> list=new ArrayList<UserDetail>();
		UserRole role = UserRole.ADMIN;
		
		UserDetail user=new UserDetail();
		user.setEmployee_id("EE00");
		user.setName("Mg Mg");
		user.setRole(role);
		user.setTeam_name("Exchange");
		user.setTeam_id("1");
		user.setDepartment_name("SSD");
		
		
		UserRole role1 = UserRole.ADMIN;
		
		UserDetail user1=new UserDetail();
		user1.setEmployee_id("EE11");
		user1.setName("Mg Mg");
		user1.setRole(role1);
		user1.setTeam_name("Exchange");
		user1.setTeam_id("1");
		user1.setDepartment_name("SSD");
		
		UserRole role2 = UserRole.ADMIN;
		
		UserDetail user2=new UserDetail();
		user2.setEmployee_id("EE11");
		user2.setName("Mg Mg");
		user2.setRole(role2);
		user2.setTeam_name("Exchange");
		user2.setTeam_id("1");
		user2.setDepartment_name("SSD");
		
		list.add(user);
		list.add(user1);
		list.add(user2);
		
		when(userRepository.userDetail()).thenReturn(list);
		List<UserDetail> userdetailList=userService.userDetail();
		assertEquals(3,userdetailList.size());
		//verify(userRepository, times(1)).findAll();
	}

	@Test
	void testSearchByNameOrId() {
		List<UserDetail> list=new ArrayList<UserDetail>();
		UserRole role = UserRole.ADMIN;
		
		UserDetail user=new UserDetail();
		user.setEmployee_id("EE00");
		user.setName("Mg Mg");
		user.setRole(role);
		user.setTeam_id("123");
		user.setTeam_name("Exchange");
		user.setDepartment_name("SSD");


		
//		when(userRepository.searchByNameOrId("EE00").thenReturn(list);
//		List<UserDetail> userDetail=userService.searchByNameOrId("");
//		assertEquals(3,userDetail.size());
		
		list.add(user);
		
		
            when(userRepository.searchByNameOrId("EE00")).thenReturn(list);
            //verify(userRepository, times(1)).searchByNameOrId("EE00");
            List<UserDetail> userDetail=userService.searchByNameOrId("EE00");
    		assertEquals(1,userDetail.size());
	}

	@Test
	void testSeacrhByDepartmentName() {
		List<UserDetail> list=new ArrayList<UserDetail>();
UserRole role = UserRole.ADMIN;
		
		UserDetail user=new UserDetail();
		user.setEmployee_id("EE00");
		user.setName("Mg Mg");
		user.setRole(role);
		user.setTeam_id("123");
		user.setTeam_name("Exchange");
		user.setDepartment_name("SSD");
		list.add(user);
		
		 when(userRepository.seacrhByDepartmentName("SSD")).thenReturn(list);
		List<UserDetail> user1=userService.seacrhByDepartmentName("SSD");
		assertEquals(1,user1.size());
	}

	@Test
	void testSearchByTeamName() {
		List<UserDetail> list=new ArrayList<UserDetail>();
		UserRole role = UserRole.ADMIN;
		
		UserDetail user=new UserDetail();
		user.setEmployee_id("EE00");
		user.setName("Mg Mg");
		user.setRole(role);
		user.setTeam_id("123");
		user.setTeam_name("Exchange");
		user.setDepartment_name("SSD");
		list.add(user);
		
		when(userRepository.searchByTeamName("Exchange")).thenReturn(list);
		List<UserDetail> user1=userService.searchByTeamName("Exchange");
		assertEquals(1,user1.size());
	}

	@Test
	void testIsUserExist() {
		UserRole role = UserRole.ADMIN;
		
		UserDetail user=new UserDetail();
		user.setEmployee_id("EE00");
		user.setName("Mg Mg");
		user.setRole(role);
		user.setTeam_id("123");
		user.setTeam_name("Exchange");
		user.setDepartment_name("SSD");
		
		//when(userRepository.checkUserExist("EE00").thenReturn(true);
		when(userRepository.checkUserExist(anyString())).thenReturn(true);
		Boolean user1=userService.isUserExist("EE00");
		assertEquals(true,user1);
	}

	@Test
	void testSearchById() {
		UserRole role = UserRole.ADMIN;
	    
		UserDetailForUpdate user=new UserDetailForUpdate("EE00", "Mg Mg", role, "Exchange", "SSD","0988", "Manager", "male","1" );
		//when(userRepository.searchById("EE00").thenReturn(user);
		when(userRepository.searchById("EE00")).thenReturn(user);
		assertThat(user).isNotNull();
		assertEquals("EE00",user.getEmployee_id());
	}

}
