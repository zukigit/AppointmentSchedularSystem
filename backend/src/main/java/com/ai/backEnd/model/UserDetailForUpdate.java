package com.ai.backEnd.model;

public class UserDetailForUpdate {

	String employee_id;
    String name;
    UserRole role;
    String team_name;
    String password;
	String department_name;
    String phone_number;
    String position;
    String gender;
    String team_id;
	
	public UserDetailForUpdate(String employee_id, String name, UserRole role, String team_name, String department_name,
			String phone_number, String position, String gender, String team_id) {
		super();
		this.employee_id = employee_id;
		this.name = name;
		this.role = role;
		this.team_name = team_name;
		this.department_name = department_name;
		this.phone_number = phone_number;
		this.position = position;
		this.gender = gender;
		this.team_id = team_id;
	}
	public String getTeam_id() {
		return team_id;
	}
	public void setTeam_id(String team_id) {
		this.team_id = team_id;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
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
	public UserRole getRole() {
		return role;
	}
	public void setRole(UserRole role) {
		this.role = role;
	}
	public String getTeam_name() {
		return team_name;
	}
	public void setTeam_name(String team_name) {
		this.team_name = team_name;
	}
	public String getDepartment_name() {
		return department_name;
	}
	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
