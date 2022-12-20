package com.ai.backEnd.model;

import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import com.ai.backEnd.security.UserPermission;
import com.google.common.collect.Sets;

public enum UserRole {
	
	ADMIN,
	USER,
	TRAINEE
}
