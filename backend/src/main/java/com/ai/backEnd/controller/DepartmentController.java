package com.ai.backEnd.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ai.backEnd.model.Department;
import com.ai.backEnd.service.DepartmentService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class DepartmentController {
	
	@Autowired
	private DepartmentService service;

	@PostMapping("/addDepartment")
	public Department saveDepartment(@RequestBody Department department) {
		return service.saveDepartment(department);
	}
	
	@GetMapping("/getDepartment")
	public List<Department> getDepartment(){
		System.out.println("department is called");
		return service.getDepartment();
	}
	
	
	
}
