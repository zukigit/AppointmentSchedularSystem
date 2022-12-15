package com.ai.backEnd.exceptions;

public class UserNotFoundException extends RuntimeException{

	public UserNotFoundException(String s) {
		super(s);
	}
}
