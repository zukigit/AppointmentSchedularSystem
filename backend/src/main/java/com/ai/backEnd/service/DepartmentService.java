package com.ai.backEnd.service;

import java.util.List;

import com.ai.backEnd.model.Department;

public interface DepartmentService {
	
	Department saveDepartment(Department department);
	
	List<Department> getDepartment();

}
