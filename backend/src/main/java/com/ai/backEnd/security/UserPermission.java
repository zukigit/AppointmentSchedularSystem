package com.ai.backEnd.security;

public enum UserPermission {

	APPOINTMENT_READ("course:read"),
	APPOINTMENT_WRITE("course:read"),
	USER_READ("user:read"),
	USER_WRITE("user:write");
	
	private final String permission;

	private UserPermission(String permission) {
		this.permission = permission;
	}

	public String getPermission() {
		return permission;
	}
}
