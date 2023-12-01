package com.ensf614.flightreservation.model;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Entity
public class Flight {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "flightid")
	private Long id;

    private String origin;

    private String destination;
    
	private LocalDate departureDate;
	
	@JsonManagedReference
    @OneToOne(mappedBy = "flight")
    private Aircraft aircraft;
    
	@JsonManagedReference
    @OneToOne(mappedBy = "flight")
    private Crew crew;
    
    public Flight() {
    	
    }
	
    public Flight(String origin, String destination, LocalDate departureDate) {
    	this.origin = origin;
    	this.destination = destination;
        this.departureDate = departureDate;
    }
    public Long getID() {
        return id;
    }
    
    public void setID(Long id) {
    	this.id = id;
    }
    
    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }
    
    public Aircraft getAircraft() {
    	return this.aircraft;
    }
    
    public void setAircraft(Aircraft a) {
    	this.aircraft = a;
    }
    
    public Crew getCrew() {
    	return this.crew;
    }
    
    public void setCrew(Crew crew) {
    	this.crew = crew;
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

