package com.ai.backEnd.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ai.backEnd.model.Department;
import com.ai.backEnd.repository.DepartmentRepository;
import com.ai.backEnd.service.DepartmentService;

@Service
public class DepartmentImpl implements DepartmentService{
	
	@Autowired
	private DepartmentRepository departmentRepo;

	@Override
	public Department saveDepartment(Department department) {
		return departmentRepo.save(department);
	}

	@Override
	public List<Department> getDepartment() {
		return departmentRepo.findAll();
	}

}
