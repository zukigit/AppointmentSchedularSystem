package com.ai.backEnd.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ai.backEnd.model.Team;
import com.ai.backEnd.service.TeamService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class TeamController {
	
	@Autowired
	private TeamService service;
	
	@PostMapping(value="/saveTeam")
	public Team saveTeam(@RequestBody Team team) {
		return service.saveTeam(team);
	}
	
	@GetMapping("/getTeam")
	public List<Team> getTeam(){
		return service.getTeam();
	}
	
	
}
