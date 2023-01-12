package com.ai.backEnd.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class User implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	private String employee_id;
	private String name;
	private String password;
    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "image_id", referencedColumnName = "image_id")
	private UserImage userImage = null;
	private String phone_number;
	private String gender;
	private String position;
	@Enumerated(EnumType.STRING)
	private UserRole role;
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team_id")
	private Team team;
	private boolean isAccountNonExpired = true;
	private boolean isAccountNonLocked = true;
	private boolean isCredentialsNonExpired = true;
	private boolean isEnabled = true;
	@ManyToMany(mappedBy = "employee", cascade = CascadeType.REMOVE)
	
	private List<Appointment> appointments;
	
	public User() {
		
	}
	
	public User(String employee_id, String name, String password, UserImage userImage, String phone_number,
			String gender, String position, UserRole role, Team team, boolean isAccountNonExpired,
			boolean isAccountNonLocked, boolean isCredentialsNonExpired, boolean isEnabled,
			List<Appointment> appointments) {
		super();
		this.employee_id = employee_id;
		this.name = name;
		this.password = password;
		this.userImage = userImage;
		this.phone_number = phone_number;
		this.gender = gender;
		this.position = position;
		this.role = role;
		this.team = team;
		this.isAccountNonExpired = isAccountNonExpired;
		this.isAccountNonLocked = isAccountNonLocked;
		this.isCredentialsNonExpired = isCredentialsNonExpired;
		this.isEnabled = isEnabled;
		this.appointments = appointments;
	}

	public List<Appointment> getAppointments() {
		return appointments;
	}
	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}
	public UserImage getUserImage() {
		return userImage;
	}
	public void setUserImage(UserImage userImage) {
		this.userImage = userImage;
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
	public Team getTeam() {
		return team;
	}
	public void setTeam(Team team) {
		this.team = team;
	}
	public boolean isAccountNonExpired() {
		return isAccountNonExpired;
	}
	public void setAccountNonExpired(boolean isAccountNonExpired) {
		this.isAccountNonExpired = isAccountNonExpired;
	}
	public boolean isAccountNonLocked() {
		return isAccountNonLocked;
	}
	public void setAccountNonLocked(boolean isAccountNonLocked) {
		this.isAccountNonLocked = isAccountNonLocked;
	}
	public boolean isCredentialsNonExpired() {
		return isCredentialsNonExpired;
	}
	public void setCredentialsNonExpired(boolean isCredentialsNonExpired) {
		this.isCredentialsNonExpired = isCredentialsNonExpired;
	}
	public boolean isEnabled() {
		return isEnabled;
	}
	public void setEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}
}
