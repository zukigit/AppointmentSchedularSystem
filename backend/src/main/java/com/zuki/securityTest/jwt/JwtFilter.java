package com.zuki.securityTest.jwt;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter{

	@Autowired
	private JwtHelper jwtHelper;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String token = getToken(request);
		var clamins = jwtHelper.parseClaims(token);
		SecurityContextHolder.getContext().setAuthentication(createAuthentication(clamins));
		filterChain.doFilter(request, response);
	}
	
	private Authentication createAuthentication(Map<String, Object> claims) {
		var roles = Arrays.stream(claims.get("roles").toString().split(","))
						  .map(SimpleGrantedAuthority::new)
						  .collect(Collectors.toList());
		return new UsernamePasswordAuthenticationToken(claims.get(Claims.SUBJECT), null, roles);
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		return request.getRequestURI().startsWith("/auth");
	}
	
	private String getToken(HttpServletRequest request) {
		return Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
					   .filter(auth -> auth.startsWith("Bearer "))
					   .map(auth-> auth.replace("Bearer ", ""))
					   .orElseThrow(() -> new BadCredentialsException("Invalid token"));
	}
}
