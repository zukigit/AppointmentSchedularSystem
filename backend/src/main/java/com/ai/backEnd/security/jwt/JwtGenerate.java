package com.ai.backEnd.security.jwt;

import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import com.ai.backEnd.dto.LoginRequestModel;
import com.ai.backEnd.security.auth.ApplicationUser;

@Component
public class JwtGenerate {

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtHelper jwtHelper;
	
	public JwtResponse checkLoginRequest(LoginRequestModel model){
		var authenticated = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(model.getUserId(), model.getPassword()));
		return createJwtToken(authenticated);
	}
	
	private JwtResponse createJwtToken(Authentication authentication) {
		JwtResponse jwtResponse = new JwtResponse();
		var user = (ApplicationUser) authentication.getPrincipal();
		String userId = user.getUsername();
		var rolesString = user.getAuthorities().stream()
											   .map(GrantedAuthority::getAuthority)
											   .collect(Collectors.joining());
		jwtResponse.setToken(jwtHelper.createToken(user.getUsername(), Map.of("roles", rolesString)));
		jwtResponse.setRole(rolesString);
		jwtResponse.setUserId(userId);
		return jwtResponse;
	}
}
