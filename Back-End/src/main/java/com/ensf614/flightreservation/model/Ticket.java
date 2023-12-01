package com.ensf614.flightreservation.model;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "tickets")
public class Ticket {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ticketid")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "flightid", nullable = false)
	private Flight flight;
	
	// Ticket related fields.
	private String firstName;
	private String lastName;
	private String origin;
	private String destination;
	private LocalDate departureDate;
	
	// Seat related fields.
	@OneToOne
	@JoinColumn(name = "seat_id")
	private Seat seat;
	
	private int seatRowNum;
	private char seatColChar;
	private String seatType;
	private double price;
	
	// Default constructor.
	public Ticket() {
		
	}
	
	// Constructor for Ticket that takes in flight, seat row, and column.
	public Ticket(Flight flight, int r, char c, String fn, String ln) {
		this.flight = flight;
		
		// Set the first name and last name of the ticket holder.
		this.firstName = fn;
		this.lastName = ln;
		
		// Initialize the ticket-related fields using flight information.
		this.origin = flight.getOrigin();
		this.destination = flight.getDestination();
		this.departureDate = flight.getDepartureDate();
		
		// Set the seat for this Ticket.
		this.seat = findSeatByRowAndColumn(flight, r, c);
		
		// Based on the seat, set the seat related variables for the Ticket.
		this.seatRowNum = this.seat.getRowNum();
		this.seatColChar = this.seat.getColChar();
		this.seatType = this.seat.getSeatType();
		this.price = this.seat.getPrice();
		
		// Mark the seat as assigned.
		this.seat.setAvailability(false);
	}
	
	/**
	 * Find the seat based on the flight, row, and column.
	 * @param flight
	 * @param seatRow
	 * @param seatColChar
	 * @return
	 */
	private Seat findSeatByRowAndColumn(Flight flight, int r,char c) {
		Aircraft aircraft = flight.getAircraft();
		
		// Check if aircraft or seats are null
	    if (aircraft == null || aircraft.getSeats() == null) {
	        throw new RuntimeException("Aircraft or seats are null");
	    }
	    
		// Iterate through each seat on the aircraft
	    for (Seat seat : aircraft.getSeats()) {
	        if (seat.getRowNum() == r && seat.getColChar() == c) {
	            return seat; // Found the seat
	        }
	    }

	    throw new SeatNotFoundException("Seat not found for row " + r + " and column " + c);
	}
	
	// Getters and setters.
	public void setId(Long id) {
		this.id = id;
	}
	
	public Flight getFlight() {
		return flight;
	}
	
	public void setFlight(Flight flight) {
		this.flight = flight;
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
	
	public Seat getSeat() {
		return seat;
	}
	
	public void setSeat(Seat seat) {
		this.seat = seat;
	}
	
	public int getSeatRowNum() {
		return seatRowNum;
	}
	
	public void setSeatRowNum(int seatRowNum) {
		this.seatRowNum = seatRowNum;
	}
	
	public char getSeatColChar() {
		return seatColChar;
	}
	
	public void setSeatColChar(char seatColChar) {
		this.seatColChar = seatColChar;
	}
	
	public String getSeatType() {
		return seatType;
	}
	
	public void setSeatType(String seatType) {
		this.seatType = seatType;
	}
	
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	// Custom exception for seat not found
	public class SeatNotFoundException extends RuntimeException {
	    public SeatNotFoundException(String message) {
	        super(message);
	    }
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	
	
	
}
