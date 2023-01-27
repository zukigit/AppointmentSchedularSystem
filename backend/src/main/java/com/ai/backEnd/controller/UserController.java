package com.ai.backEnd.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.ai.backEnd.dto.ChangePasswordModel;
import com.ai.backEnd.model.Appointment;
import com.ai.backEnd.model.Notification;
import com.ai.backEnd.model.Schedule;
import com.ai.backEnd.model.User;
import com.ai.backEnd.dto.UserDetail;
import com.ai.backEnd.dto.UserDetailForUpdate;
import com.ai.backEnd.model.UserRole;
import com.ai.backEnd.service.AppointmentService;
import com.ai.backEnd.service.NotificationService;
import com.ai.backEnd.service.UserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private AppointmentService appointmentService;
	
	@Autowired
	private NotificationService notiService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@GetMapping("/getUser")
	@PreAuthorize("hasRole('ADMIN')")
	public List<User> getUser(ModelMap model, User employee) {
		return userService.getAllUser();
	}

	// AddUser
	@PostMapping("/saveUser")
	@PreAuthorize("hasRole('ADMIN')")
	public void saveUser(@RequestBody User user) {
		if (userService.isUserExist(user.getEmployee_id())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "UserId already exists!");
		} else {
			String encodedPassword = passwordEncoder.encode(user.getPassword());
			user.setPassword(encodedPassword);
			userService.saveUser(user);
		}
	}

	// Delete User
	@DeleteMapping("/deleteUser/{employee_id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable String employee_id) {
		User dto = userService.getUserById(employee_id);
		
		if (dto.getRole() == UserRole.ADMIN) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Admin can't be deleted");
		} else {
			deleteUserAppointmentRecords(employee_id);
			deleteNotiRecords(employee_id);
			userService.deleteUserById(employee_id);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
		}
	}
	
	private void deleteNotiRecords(String employee_id) {
		List<String> user = new ArrayList<>(List.of(employee_id));
		List<Notification> notis = notiService.getNotiByUser(user);
		
		for (Notification notification : notis) {
			notification.setUser(null);
		}
	}
	
	private void deleteUserAppointmentRecords(String employee_id) {
		List<Appointment> appointments = appointmentService.getByUserList(List.of(employee_id));
		for(Appointment appointment : appointments) {
			ListIterator<User> usersItr = appointment.getEmployee().listIterator();
			while(usersItr.hasNext()) {
				if(usersItr.next().getEmployee_id() == employee_id) {
					usersItr.remove();
				}
			}
		}
	}

	// GetById
	@GetMapping("/getById/{employee_id}")
	@PreAuthorize("hasRole('ADMIN')")
	public UserDetailForUpdate getUserById(@PathVariable String employee_id) {
		return userService.searchById(employee_id);
	}

	// Update User
	@PutMapping("/updateUser/{employee_id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		user.setUserImage(userService.getUserById(user.getEmployee_id()).getUserImage());
		if (user.getPassword().equals("")) {
			User retreatedUser = userService.getUserById(user.getEmployee_id());
			user.setPassword(retreatedUser.getPassword());
		} else {
			String encodedPassword = passwordEncoder.encode(user.getPassword());
			user.setPassword(encodedPassword);
		}
		userService.saveUser(user);
		return ResponseEntity.ok(user);
	}

	@GetMapping("/userDetail")
	public List<UserDetail> userDetail() {
		return userService.userDetail();
	}

	@GetMapping("/updatePhoneNumber")
	@PreAuthorize("hasRole('ADMIN')")
	public String updatePhone(@RequestParam String userId, @RequestParam String newPhoneNumber) {

		User user = userService.getUserById(userId);
		user.setPhone_number(newPhoneNumber);
		userService.saveUser(user);
		return user.getPhone_number();
	}

	@PostMapping("/changePassword")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Boolean> changePassword(@RequestBody ChangePasswordModel changePasswordModel) {
		User user = userService.getUserById(changePasswordModel.getUserId());
		if (passwordEncoder.matches(changePasswordModel.getOldPassword(), user.getPassword())) {
			user.setPassword(passwordEncoder.encode(changePasswordModel.getNewPassword()));
			userService.saveUser(user);
			return ResponseEntity.ok(true);
		} else {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Old password is wrong!");
		}
	}

	@PostMapping("/getAvaliableEmployees")
	public List<UserDetail> getAvaliableEmployee(@RequestBody List<Schedule> schedules) {
		List<Appointment> appointments = appointmentService.getByScheduleList(schedules);
		List<User> unavaliUsers = new ArrayList<>();
		for(Appointment appointment : appointments) {
			unavaliUsers.addAll(appointment.getEmployee());
		}
		
		if(appointments.size() == 0) {
			return userService.userDetail();
		} else {
			List<UserDetail> users = userService.getAvaliableUsers(unavaliUsers);
			System.out.println("users size " + users.size());
			return userService.getAvaliableUsers(unavaliUsers);
		}
	}
}
