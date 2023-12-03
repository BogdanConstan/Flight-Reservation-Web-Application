package com.ensf614.flightreservation.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ensf614.flightreservation.model.Ticket;
import com.ensf614.flightreservation.model.Flight;
import com.ensf614.flightreservation.model.Seat;
import com.ensf614.flightreservation.repository.TicketRepository;
import com.ensf614.flightreservation.repository.FlightRepository;
import com.ensf614.flightreservation.request.TicketRequest;

import java.util.Optional;



// Other imports...

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final FlightRepository flightRepository; // Assuming you have a repository for flights

    @Autowired
    public TicketService(TicketRepository ticketRepository, FlightRepository flightRepository) {
        this.ticketRepository = ticketRepository;
        this.flightRepository = flightRepository;
    }

    public Ticket createTicket(TicketRequest ticketRequest) {
        Optional<Flight> flightOptional = flightRepository.findById(ticketRequest.getFlight().getID());
        if (!flightOptional.isPresent()) {
            throw new RuntimeException("Flight not found");
        }
        Flight flight = flightOptional.get();

        // Create and set a new Seat for the ticket
        Seat seat = new Seat(ticketRequest.getSeatRowNum(), ticketRequest.getSeatColChar(), true, "Economy"); // Modify as needed

        Ticket ticket = new Ticket(flight, seat.getRowNum(), seat.getColChar(), ticketRequest.getFirstName(), ticketRequest.getLastName(), null); // Modify as needed for payment
        return ticketRepository.save(ticket);
    }

    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id).orElse(null);
    }

    public void updateTicket(Ticket ticket) {
        ticketRepository.save(ticket);
    }
    
    public void cancelTicket(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
        if (ticket != null) {
            ticket.cancelTicket();
            ticketRepository.save(ticket);
        } else {
            throw new RuntimeException("Ticket not found for id: " + ticketId);
        }
    }

    // Additional service methods...
}

