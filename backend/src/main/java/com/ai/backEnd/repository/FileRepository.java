package com.ai.backEnd.repository;

import com.ai.backEnd.model.AppointmentFile;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FileRepository extends JpaRepository<AppointmentFile, Integer> {

}
