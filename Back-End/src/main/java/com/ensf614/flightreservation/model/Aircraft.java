package com.ensf614.flightreservation.model;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Aircraft {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "aircraftid")
    private Long id;

    private int numRows;
    private int numCols;
    private boolean assigned;
    
    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "flightid")
    private Flight flight;
    
	@JsonManagedReference
    @OneToMany(mappedBy = "aircraft", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Seat> seats = new ArrayList<>();

    public Aircraft() {
        // Default constructor
    }

    public Aircraft(int numRows, int numCols) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.assigned = false;        
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public boolean getAssigned() {
    	return this.assigned;
    }
    
    public void setAssigned(boolean set) {
    	this.assigned = set;
    }

    public int getNumRows() {
        return numRows;
    }

    public void setNumRows(int numRows) {
        this.numRows = numRows;
    }

    public int getNumCols() {
        return numCols;
    }

    public void setNumCols(int numCols) {
        this.numCols = numCols;
    }

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }

    public void addSeat(Seat seat) {
        seats.add(seat);
        //seat.setAircraft(this);
    }

    public void removeSeat(Seat seat) {
        seats.remove(seat);
        seat.setAircraft(null);
    }
    
    public Flight getFlight() {
		return flight;
	}

	public void setFlight(Flight flight) {
		this.flight = flight;
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

