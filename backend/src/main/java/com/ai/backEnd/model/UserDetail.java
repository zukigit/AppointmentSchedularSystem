package com.ai.backEnd.model;

public class UserDetail {


    String employee_id;
    String name;
    UserRole role;
    String team_name;
    String department_name;

    

	public UserDetail(String employee_id, String name, UserRole role, String team_name, String department_name) {
		this.employee_id = employee_id;
		this.name = name;
		this.role = role;
		this.team_name = team_name;
		this.department_name = department_name;
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
}
