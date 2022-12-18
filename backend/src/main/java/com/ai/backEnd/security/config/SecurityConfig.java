package com.ai.backEnd.security.config;

import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.ai.backEnd.security.jwt.JwtFilter;
import com.ai.backEnd.security.jwt.JwtGenerate;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	
	@Autowired
	@Lazy
	private JwtGenerate loginFilter;
	@Autowired
	private JwtFilter jwtFilter;

	@Bean
	public UserDetailsService userDetailsService() {
		var uds = new InMemoryUserDetailsManager();
		uds.createUser(User.builder().username("zuki").password("{noop}123").roles("ADMIN").build());
		uds.createUser(User.builder().username("nine").password("{noop}123").roles("USER").build());
		uds.createUser(User.builder().username("other").password("{noop}123").roles("TRAINEE").build());
		return uds;
	}

	@Bean
	public AuthenticationManager authenticationManager(UserDetailsService userDetailsService) {
		var dao = new DaoAuthenticationProvider();
		dao.setUserDetailsService(userDetailsService);
		return new ProviderManager(dao);
	}

	@Bean
	public SecurityFilterChain secrityFilterChain(HttpSecurity http) throws Exception {
		http
			.cors()
			.and()
			.csrf().disable()
			.authorizeHttpRequests(
					(auth)-> auth.antMatchers("/auth").permitAll()
								 .antMatchers("/").permitAll().anyRequest().authenticated())
			.addFilterAt(jwtFilter, BasicAuthenticationFilter.class)
			.exceptionHandling()
				.accessDeniedHandler((request, response, accessDeniedException) -> {
					response.setStatus(HttpServletResponse.SC_FORBIDDEN);
					response.getWriter().print(accessDeniedException.getMessage());
				})
				.authenticationEntryPoint((request, response, autheException) -> {
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					response.getWriter().print(autheException.getMessage());
				});
		return http.build();
	}
}
