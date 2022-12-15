package com.zuki.securityTest.securtiy;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class PasswordEncorderConfig {

	@Bean
	public PasswordEncoder passwordEncorder() {
		return new BCryptPasswordEncoder(10);
	}
}
