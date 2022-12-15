package com.ai.backEnd;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.ai.backEnd.model.Team;
import com.ai.backEnd.repository.TeamRepository;
import com.ai.backEnd.service.TeamService;

@SpringBootTest
@AutoConfigureMockMvc
public class TeamControllerTest {
	@Autowired
	private MockMvc mockMvc;
	@MockBean
	TeamService teamService;
	@MockBean
	TeamRepository teamRepo;
	
	@Test
	public void teamdisplay() throws Exception {
		this.mockMvc.perform(get("/api/v1/getTeam"))
		.andExpect(status().isOk());
		
	}
	

}
