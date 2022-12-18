package com.ai.backEnd.security.jwt;

public class JwtResponse {

	private String token;
	private String role;
	private String userId;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getToken() {
		return token;
	}

	public JwtResponse setToken(String token) {
		this.token = token;
		return this;
	}
}
