package com.zuki.securityTest.securtiy;

import java.util.Map;

import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import com.zuki.securityTest.jwt.JwtHelper;
import com.zuki.securityTest.model.LoginRequestModel;

@Component
public class JwtGenerate {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtHelper jwtHelper;

	private String createJwtToken(Authentication authentication) {
		var user = (User) authentication.getPrincipal();
		var rolesString = user.getAuthorities().stream()
											   .map(GrantedAuthority::getAuthority)
											   .collect(Collectors.joining());
		return jwtHelper.createToken(user.getUsername(), Map.of("roles", rolesString));
	}
	
	public String checkLoginRequest(LoginRequestModel model){
		try {
			var authenticated = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(model.getUserId(), model.getPassword()));
			return createJwtToken(authenticated);
		} catch(AuthenticationException e){
			return "";
		}	
	}
	
//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//			throws ServletException, IOException {
//		var username = request.getHeader("userId");
//		var password = request.getHeader("password");
//		var authenticated = authenticationManager.authenticate(
//				new UsernamePasswordAuthenticationToken(username, password));
//		response.setHeader(HttpHeaders.AUTHORIZATION, createJwtToken(authenticated));
//	}
	
//	@Override
//	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//		var method = request.getMethod();
//		var uri = request.getRequestURI();
//		System.out.println("method is:" + method);
//		System.out.println("uri is:" + uri);
//		var isLogin = HttpMethod.POST.matches(method) && uri.startsWith("/auth");
//		return !isLogin;
//	}
}
