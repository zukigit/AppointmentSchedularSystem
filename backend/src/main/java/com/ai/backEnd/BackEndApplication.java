package com.ai.backEnd;

import java.io.IOException;
import java.io.InputStream;

import javax.annotation.Resource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.source.ConfigurationPropertyName.Form;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.ClassPathResource;

import com.ai.backEnd.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
public class BackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

}
