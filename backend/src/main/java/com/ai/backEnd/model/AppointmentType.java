package com.ai.backEnd.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AppointmentType {

	@JsonValue
	DecisonMakingMetting,
	@JsonValue
	ProblemSolvingMetting,
	@JsonValue
	BaringStormingMeeting,
	@JsonValue
	CommunicationMeeting,
	@JsonValue
	MonitoringProgressMetting,
	@JsonValue
	TeamMetting
	
}
