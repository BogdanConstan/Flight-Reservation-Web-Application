package com.ensf614.flightreservation.controller;

import com.ensf614.flightreservation.model.Flight;
import com.ensf614.flightreservation.model.Ticket;
import com.ensf614.flightreservation.repository.FlightRepository;
import com.ensf614.flightreservation.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
public class TicketController {
	private final TicketRepository ticketRepository;
	private final FlightRepository flightRepository;
	
	@Autowired
	public TicketController(TicketRepository ticketRepository, FlightRepository flightRepository) {
		this.ticketRepository = ticketRepository;
		this.flightRepository = flightRepository;
	}
	
	// GET all the tickets.
	public List<Ticket> getAllTickets() {
		return ticketRepository.findAll();
	}
	
	// GET a specific ticket by ID.
	@GetMapping("/{id}")
	public Ticket getTicketById(@PathVariable Long id) {
		return ticketRepository.findById(id).orElse(null);
	}
	
	
	@PostMapping("/ticket")
	public Ticket createTicket(@RequestBody Ticket ticketRequest) {
		
	    // Extract relevant information from the request
	    Long flightId = ticketRequest.getFlight().getID();
	    int seatRowNum = ticketRequest.getSeatRowNum();
	    char seatColChar = ticketRequest.getSeatColChar();
	    String firstName = ticketRequest.getFirstName();
	    String lastName = ticketRequest.getLastName();

	    // Retrieve the associated Flight entity
	    Flight flight = flightRepository.findById(flightId).orElse(null);

	    if (flight != null) {
	        // Create a new Ticket using the appropriate constructor
	        Ticket newTicket = new Ticket(flight, seatRowNum, seatColChar, firstName, lastName);

	        // Save the new ticket
	        return ticketRepository.save(newTicket);
	    } else {
	        // Handle the case where the associated flight is not found
	        throw new RuntimeException("Flight not found for id: " + flightId);
	    }
	}
	
	// Delete a ticket by ID
	@DeleteMapping("/ticket/{id}")
	public void deleteTicket(@PathVariable Long id) {
		Ticket ticket = ticketRepository.findById(id).orElse(null);
		
		if (ticket != null) {
			// Set the assigned set attribute to true before deleting the ticket.
			ticket.getSeat().setAvailability(true);
			
			// Delete the ticket.
			ticketRepository.deleteById(id);
		} else {
			// Do nothing.
		}
	}

}
