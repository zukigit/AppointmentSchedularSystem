package com.ai.backEnd.security;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.google.common.collect.Sets;

public enum UserAuthRole {

	ADMIN(),
	USER(),
	TRAINEE();
	
	public Set<SimpleGrantedAuthority> getGrantantedAuthorities() {
		return new HashSet<SimpleGrantedAuthority>(Set.of(new SimpleGrantedAuthority("ROLE_" + this.name())));
	}
}
