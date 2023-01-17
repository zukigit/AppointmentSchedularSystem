package com.ai.backEnd.serviceImpl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.ai.backEnd.model.Department;
import com.ai.backEnd.repository.DepartmentRepository;

@SpringBootTest
class DepartmentImplTest {

	@Mock
	DepartmentRepository departmentRepository;
	
	@InjectMocks
	DepartmentImpl departmentImpl;
	@Test
	void saveDepartment() {
		Department department=new Department();
		department.setDepartment_id("1");
		department.setDepartment_name("SSD");
		
		when(departmentRepository.save(any(Department.class))).thenReturn(department);

	    Department savedUser = departmentRepository.save(department);
	    assertThat(savedUser.getDepartment_name()).isNotNull();
		
	}
	
	@Test 
	void getDepartment() {
		List<Department> list=new ArrayList<Department>();
		Department department=new Department();
		department.setDepartment_id("1");
		department.setDepartment_name("SSD");
		
		
		Department department1=new Department();
		department1.setDepartment_id("1");
		department1.setDepartment_name("SSD");
		
		Department department2=new Department();
		department2.setDepartment_id("1");
		department2.setDepartment_name("SSD");
		
		list.add(department);
		list.add(department2);
		list.add(department1);
		when(departmentRepository.findAll()).thenReturn(list);

	    List<Department> departmentList = departmentImpl.getDepartment();
	    assertThat(departmentList.size()).isGreaterThan(0);
	}

}
