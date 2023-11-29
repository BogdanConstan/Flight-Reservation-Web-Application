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
	private Long ID;
	
    @ManyToOne
    @JoinColumn(name = "origin") // Change the column name as per your requirements
    private Location origin;
    
    @ManyToOne
    @JoinColumn(name = "destination") // Change the column name as per your requirements
    private Location destination;
    
	private LocalDate departureDate;
	
	@JsonManagedReference
    @OneToOne(mappedBy = "flight")
    private Aircraft aircraft;
    
	@JsonManagedReference
    @OneToOne(mappedBy = "flight")
    private Crew crew;
    
    public Flight() {
    	
    }
	
    public Flight(LocalDate departureDate) {
        this.departureDate = departureDate;
    }
    public Long getFlightID() {
        return ID;
    }
    
    public Location getOrigin() {
        return origin;
    }

    public void setOrigin(Location origin) {
        this.origin = origin;
    }

    public Location getDestination() {
        return destination;
    }

    public void setDestination(Location destination) {
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

