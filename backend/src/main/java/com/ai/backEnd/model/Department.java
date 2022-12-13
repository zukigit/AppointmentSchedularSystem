package com.ai.backEnd.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class Department implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	private String department_id;
	
	private String department_name;
	
//	@OneToMany(mappedBy = "department_id", fetch = FetchType.EAGER,
//            cascade = CascadeType.ALL)
//	private List<Team> team;
//	
	

	public String getDepartment_id() {
		return department_id;
	}
	public void setDepartment_id(String department_id) {
		this.department_id = department_id;
	}
	public String getDepartment_name() {
		return department_name;
	}
	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}

	

}
