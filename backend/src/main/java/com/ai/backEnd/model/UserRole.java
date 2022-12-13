package com.ai.backEnd.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum UserRole {
	@JsonValue
	ADMIN,
	@JsonValue
	USER,
	@JsonValue
	TRAINEE
	
}
