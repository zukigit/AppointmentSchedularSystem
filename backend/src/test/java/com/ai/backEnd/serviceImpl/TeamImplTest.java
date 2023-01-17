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

import com.ai.backEnd.model.Team;
import com.ai.backEnd.repository.TeamRepository;

@SpringBootTest
class TeamImplTest {

	@Mock
	TeamRepository teamRepository;
	
	@InjectMocks
	TeamImpl teamImpl;
	@Test
	void saveTeam() {
		Team team=new Team();
		team.setTeam_id("1");
		team.setTeam_name("Exchange");
		
		when(teamRepository.save(any(Team.class))).thenReturn(team);

	    Team savedTeam = teamRepository.save(team);
	    assertThat(savedTeam.getTeam_name()).isNotNull();
		
	}
	
	@Test 
	void getTeam() {
		List<Team> list=new ArrayList<Team>();
		Team team=new Team();
		team.setTeam_id("1");
		team.setTeam_name("Exchange");
		
		
		Team team1=new Team();
		team1.setTeam_id("1");
		team1.setTeam_name("Exchange");
		
		
		list.add(team);
		list.add(team1);
		when(teamRepository.findAll()).thenReturn(list);

	    List<Team> teamList = teamImpl.getTeam();
	    assertThat(teamList.size()).isGreaterThan(0);
	}

}
