package com.ai.backEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ai.backEnd.model.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, String>{

}
