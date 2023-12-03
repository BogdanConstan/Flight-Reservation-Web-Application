package com.ensf614.flightreservation.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;


import com.fasterxml.jackson.annotation.JsonBackReference;

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
	
	private boolean isCanceled = false;
	
	// Seat related fields.
	@OneToOne
	@JoinColumn(name = "seat_id")
	private Seat seat;
	
	private int seatRowNum;
	private char seatColChar;
	private String seatType;
	private double price;
	
	// Payment related fields.
	@JsonBackReference
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "paymentid")
	private Payment payment;
	
	// Default constructor.
	public Ticket() {
	}
	
	
	// Constructor for Ticket that takes in flight, seat row, and column, as well as payment information.
    public Ticket(Flight flight, int r, char c, String fn, String ln, Payment p) {
    	
    	// Set the flight.
        this.flight = flight;
        
        // Set the passenger first name and last name.
        this.firstName = fn;
        this.lastName = ln;
        
        // Set the origin, destination, and departure date (based on the associated flight).
        this.origin = flight.getOrigin();
        this.destination = flight.getDestination();
        this.departureDate = flight.getDepartureDate();
        
        // Set the seat.
        this.seat = findSeatByRowAndColumn(flight, r, c);
        
        // Set the seat row num, col, type, and price (based on the associated seat).
        this.seatRowNum = this.seat.getRowNum();
        this.seatColChar = this.seat.getColChar();
        this.seatType = this.seat.getSeatType();
        this.price = this.seat.getPrice();
        
        // Set the availability of the seat to false.
        this.seat.setAvailability(false);

        // Create a Payment object with provided payment information when a Ticket is created
        this.payment = p;

        // Set the current Ticket instance for the Payment
        this.payment.setTickets(Collections.singletonList(this));
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
	
    /**
     * Cancels the ticket and makes the seat available again.
     */
    public void cancelTicket() {
        // Set the ticket as cancelled.
        this.isCanceled = true;

        // Make the associated seat available again
        if (this.seat != null) {
            this.seat.setAvailability(true);
        }
    }
	
	// Getters and setters.
    public Long getId() {
    	return this.id;
    }
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

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}
	
	public String getCardholderFirstName() {
        return this.payment.getCardholderFirstName();
    }

    public String getCardholderLastName() {
        return this.payment.getCardholderLastName();
    }

    public String getCardNumber() {
        return this.payment != null ? this.payment.getCardNumber() : null;
    }

    public String getCardCVC() {
        return this.payment != null ? this.payment.getCardCVC() : null;
    }

    public String getExpiry() {
        return this.payment != null ? this.payment.getExpiry() : null;
    }
    
    public boolean isCanceled() {
        return isCanceled;
    }

    public void setCanceled(boolean isCanceled) {
        this.isCanceled = isCanceled;
    }
	
	
	
	
}
