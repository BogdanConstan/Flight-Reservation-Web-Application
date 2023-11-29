package com.ensf614.flightreservation.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.*;

@Entity
public class Crew {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crewid")
    private Long id;
	private int numCrewMembers;
	private boolean assigned;
	
	@JsonBackReference
	@OneToOne
    @JoinColumn(name = "flightid")
    private Flight flight;
	
	public Crew() {
		
	}
	
	public Crew(int numCrewMembers) {
		this.numCrewMembers = numCrewMembers;
		this.assigned = false;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getNumCrewMembers() {
		return numCrewMembers;
	}

	public void setNumCrewMembers(int numCrewMembers) {
		this.numCrewMembers = numCrewMembers;
	}
	
    public Flight getFlight() {
		return flight;
	}

	public void setFlight(Flight flight) {
		this.flight = flight;
	}
	
    public boolean getAssigned() {
		return assigned;
	}

	public void setAssigned(boolean assigned) {
		this.assigned = assigned;
	}
	
    @Override
    public String toString() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Error converting object to JSON";
        }
    }
	
}
