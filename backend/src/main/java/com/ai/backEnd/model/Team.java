package com.ai.backEnd.model;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Team {
	
	@Id
	private String team_id;
	private String team_name;
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "department_id", nullable = false)
	private Department department;
//	@OneToMany(mappedBy = "employee_id", fetch = FetchType.EAGER,
//            cascade = CascadeType.ALL)
//	private List<User> user;

	public String getTeam_id() {
		return team_id;
	}
	public void setTeam_id(String team_id) {
		this.team_id = team_id;
	}
	public String getTeam_name() {
		return team_name;
	}
	public void setTeam_name(String team_name) {
		this.team_name = team_name;
	}
	public Department getDepartment() {
		return department;
	}
	public void setDepartment(Department department) {
		this.department = department;
	}
	
//	public List<User> getUser() {
//		return user;
//	}
//	public void setUser(List<User> user) {
//		this.user = user;
//	}
//	@Override
//	public String toString() {
//		return "Team [team_id=" + team_id + ", team_name=" + team_name + ", department_id=" + department_id + ", user="
//				+ user + "]";
//	}
	
	

}
