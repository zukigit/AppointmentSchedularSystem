package com.ai.backEnd.service;

import java.util.List;

import com.ai.backEnd.model.Team;

public interface TeamService {
	
	Team saveTeam(Team team);
	
	List<Team> getTeam();

}
