package com.ai.backEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ai.backEnd.model.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, String>{

}
