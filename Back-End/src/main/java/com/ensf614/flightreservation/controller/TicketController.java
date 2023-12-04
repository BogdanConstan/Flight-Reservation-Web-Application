package com.ensf614.flightreservation.controller;

import com.ensf614.flightreservation.model.Flight;
import com.ensf614.flightreservation.model.Ticket;
import com.ensf614.flightreservation.model.Payment;
import com.ensf614.flightreservation.repository.FlightRepository;
import com.ensf614.flightreservation.repository.TicketRepository;
import com.ensf614.flightreservation.repository.PaymentRepository;
import com.ensf614.flightreservation.request.TicketRequest;
import com.ensf614.flightreservation.service.TicketService;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping
public class TicketController {

    private final TicketRepository ticketRepository;
    private final FlightRepository flightRepository;
    private final PaymentRepository paymentRepository;
    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketRepository ticketRepository, FlightRepository flightRepository, PaymentRepository paymentRepository, TicketService ticketService) {
        this.ticketRepository = ticketRepository;
        this.flightRepository = flightRepository;
        this.paymentRepository = paymentRepository;
        this.ticketService = ticketService;
    }

    // GET all the tickets.
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // GET a specific ticket by ID.
    @GetMapping("/{id}")
    public Ticket getTicketById(@PathVariable Long id) {
        return ticketRepository.findById(id).orElse(null);
    }
    
    @GetMapping("/flight/{flightId}/passengers")
    public ResponseEntity<List<Ticket>> getPassengersByFlightId(@PathVariable Long flightId) {
        try {
            List<Ticket> tickets = ticketRepository.findByFlightId(flightId);
            
            List<Ticket> savedTickets = new ArrayList<Ticket>();
            
            for (Ticket ticket: tickets) {
            	if (ticket.isCanceled()) {
            		savedTickets.add(ticket);
            	}
            }
            
            return ResponseEntity.ok(savedTickets);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }
    
    @GetMapping("/ticket/search")
    public ResponseEntity<Ticket> getTicketByFlightIdAndSeat(
    		@RequestParam Flight flight,
    		@RequestParam Integer rowNum,
    		@RequestParam Character colChar
    		) {
    	try {
    		Optional<Ticket> ticketOptional = ticketRepository.findByFlightAndSeatRowNumAndSeatColChar(flight, rowNum, colChar);
    		if (ticketOptional.isPresent()) {
                Ticket ticket = ticketOptional.get();
                return ResponseEntity.ok(ticket);
    		}
    		else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Ticket());
        }
    }
    	
    
    /*public ResponseEntity<?> getTicketByPassengerName(
            @RequestParam String firstName,
            @RequestParam String lastName
    ) {
        try {
            Optional<Ticket> ticketOptional = ticketRepository.findByFirstNameAndLastName(firstName, lastName);

            if (ticketOptional.isPresent()) {
                Ticket ticket = ticketOptional.get();
                Flight flight = ticket.getFlight();

                Map<String, Object> ticketFlightInfo = new HashMap<>();
                ticketFlightInfo.put("ticket", ticket);
                ticketFlightInfo.put("flight", flight);

                return ResponseEntity.status(HttpStatus.OK).body(ticketFlightInfo);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket not found for the given passenger");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching ticket details");
        }
    }*/

    
 // Create multiple tickets.
    @PostMapping("/tickets")
    public List<Ticket> createTickets(@RequestBody List<TicketRequest> ticketRequests) {
        // Extract payment information from the first ticket request
        TicketRequest firstTicketRequest = ticketRequests.get(0);
        Payment payment = createPayment(firstTicketRequest);

        // Create tickets and associate them with the same payment
        List<Ticket> createdTickets = new ArrayList<>();

        for (TicketRequest ticketRequest : ticketRequests) {
            Ticket createdTicket = createTicketInternal(ticketRequest, payment);
            createdTickets.add(createdTicket);
        }
        payment.setTickets(createdTickets);
        paymentRepository.save(payment);

        return createdTickets;
    }

    private Payment createPayment(TicketRequest ticketRequest) {
        // Extract payment information from the first ticket request
        String cardholderFirstName = ticketRequest.getCardholderFirstName();
        String cardholderLastName = ticketRequest.getCardholderLastName();
        String cardNumber = ticketRequest.getCardNumber();
        String cardCVC = ticketRequest.getCardCVC();
        String expiry = ticketRequest.getExpiry();

        // Create a new Payment
        Payment payment = new Payment(cardholderFirstName, cardholderLastName, cardNumber, cardCVC, expiry);

        // Save the payment
        return payment;
    }
    
    private Ticket createTicketInternal(TicketRequest ticketRequest, Payment payment) {
        // Extract relevant information from the request (for the ticket).
        Long flightId = ticketRequest.getFlight().getID();
        int seatRowNum = ticketRequest.getSeatRowNum();
        char seatColChar = ticketRequest.getSeatColChar();
        String firstName = ticketRequest.getFirstName();
        String lastName = ticketRequest.getLastName();

        // Retrieve the associated Flight entity
        Flight flight = flightRepository.findById(flightId).orElse(null);

        if (flight != null) {
            // Create a new Ticket using the appropriate constructor
            Ticket newTicket = new Ticket(flight, seatRowNum, seatColChar, firstName, lastName, payment);
            
            // Save the new ticket
            return ticketRepository.save(newTicket);
        } else {
            // Handle the case where the associated flight is not found
            throw new RuntimeException("Flight not found for id: " + flightId);
        }
    }
    
    // Endpoint to cancel a ticket
    @PostMapping("/cancel-ticket")
    public ResponseEntity<String> cancelTicket(@RequestParam Long ticketId) {
        try {
            ticketService.cancelTicket(ticketId);
            return ResponseEntity.ok("Ticket successfully canceled");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error canceling ticket: " + e.getMessage());
        }
    }

    // DELETE a ticket by ID
    @DeleteMapping("/ticket/{id}")
    public void deleteTicket(@PathVariable Long id) {
        Ticket ticket = ticketRepository.findById(id).orElse(null);

        if (ticket != null) {
            // Set the assigned set attribute to true before deleting the ticket.
            ticket.getSeat().setAvailability(true);

            // Delete the ticket.
            ticketRepository.deleteById(id);
        }
    }
}