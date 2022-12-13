package com.ai.backEnd.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ai.backEnd.model.Team;
import com.ai.backEnd.repository.TeamRepository;
import com.ai.backEnd.service.TeamService;

@Service
public class TeamImpl implements TeamService{

	@Autowired
	private TeamRepository teamRepo;
	
	@Override
	public Team saveTeam(Team team) {
		return teamRepo.save(team);
	}

	@Override
	public List<Team> getTeam() {
		return teamRepo.findAll();
	}

}
