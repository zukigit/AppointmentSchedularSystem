package com.ai.backEnd.model;

import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.sql.Blob;
import java.util.Set;

import javax.persistence.*;


@Entity
public class User implements Serializable{
	private static final long serialVersionUID = 1L;
	

	@Id
	private String employee_id;
	private String name;
	private String password;
	private String photo;
	private String phone_number;
	private String gender;
	private String position;
	@Enumerated(EnumType.STRING)
	private UserRole role;
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "team_id",nullable = false)
	private Team team_id;
	@Transient
	MultipartFile file;

	public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}

	public String getEmployee_id() {
		return employee_id;
	}



	public void setEmployee_id(String employee_id) {
		this.employee_id = employee_id;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	public String getPhone_number() {
		return phone_number;
	}




	public String getPhoto() {
		return photo;
	}



	public void setPhoto(String photo) {
		this.photo = photo;
	}



	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}



	public String getGender() {
		return gender;
	}



	public void setGender(String gender) {
		this.gender = gender;
	}



	public String getPosition() {
		return position;
	}



	public void setPosition(String position) {
		this.position = position;
	}



	public UserRole getRole() {
		return role;
	}


	public void setRole(UserRole role) {
		this.role = role;
	}


	public Team getTeam_id() {
		return team_id;
	}


	public void setTeam_id(Team team_id) {
		this.team_id = team_id;
	}


}
