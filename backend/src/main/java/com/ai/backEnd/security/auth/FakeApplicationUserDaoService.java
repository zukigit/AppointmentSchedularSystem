package com.ai.backEnd.security.auth;

import java.util.ArrayList;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import com.ai.backEnd.model.User;
import com.ai.backEnd.model.UserRole;
import com.ai.backEnd.security.UserAuthRole;
import com.ai.backEnd.serviceImpl.UserImpl;

@Repository("fake")
public class FakeApplicationUserDaoService implements ApplicationUserDao{

	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	UserImpl userService;
	@Override
	public Optional<ApplicationUser> setApplicationUserByUserName(String userId) {
		return getApplicationUser(userId)
				.stream()
				.filter(applicationUser -> userId.equals(applicationUser.getUsername()))
				.findFirst();
	}
	
	private List<ApplicationUser> getApplicationUser(String userId) {
		List<User> users = userService.getAllUser();
		List<ApplicationUser> applicationUsers = new ArrayList<>();
		for(User user : users) {
			ApplicationUser appUser = new ApplicationUser(
					user.getEmployee_id(),
					user.getPassword(),
					user.getRole().equals(UserRole.ADMIN)?UserAuthRole.ADMIN.getGrantantedAuthorities()
							:user.getRole().equals(UserRole.USER)?UserAuthRole.USER.getGrantantedAuthorities()
							:UserAuthRole.TRAINEE.getGrantantedAuthorities(),
					user.isAccountNonExpired(),
					user.isAccountNonLocked(),
					user.isCredentialsNonExpired(),
					user.isEnabled());
			applicationUsers.add(appUser);
		}
		return applicationUsers;
	}
}
