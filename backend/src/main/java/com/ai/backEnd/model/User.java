package com.ai.backEnd.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity
public class User implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	private String employee_id;
	private String name;
	private String password;
	private String phone_number;
	private String gender;
	private String photo;
	private String position;
	@Enumerated(EnumType.STRING)
	private UserRole role;
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "team_id",nullable = false)
	private Team team_id;
	
	
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



	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}



	public String getGender() {
		return gender;
	}



	public void setGender(String gender) {
		this.gender = gender;
	}



	public String getPhoto() {
		return photo;
	}



	public void setPhoto(String photo) {
		this.photo = photo;
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

	@Override
	public String toString() {
		return "User [employee_id=" + employee_id + ", name=" + name + ", password=" + password + ", phone_number="
				+ phone_number + ", gender=" + gender + ", photo=" + photo + ", position=" + position + ", role=" + role
				+ ", team_id=" + team_id + "]";
	}
	

}
