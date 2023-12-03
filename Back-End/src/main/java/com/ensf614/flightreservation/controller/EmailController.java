package com.ensf614.flightreservation.controller;

import java.util.ArrayList;
import java.util.List;

//EmailController.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ensf614.flightreservation.model.Ticket;
import com.ensf614.flightreservation.service.EmailService;

@CrossOrigin("*")
@RestController
public class EmailController {

 @Autowired
 private EmailService emailService;
 
 
 
 @PostMapping("/send-receipt")
 public String sendReceipt(@RequestBody ReceiptRequest receiptRequest) {
     // Assuming that receiptRequest contains a ticketId or similar identifier
     //Long ticketId = receiptRequest.getTicketId();

     // Construct the cancellation link
     String cancellationLink = "http://localhost:3000/cancellation";
     
     // Create the email body including the flight details and cancellation link
     String emailBody = "Receipt Details: \n";
     emailBody += "Card Holder First Name: " + receiptRequest.getCardholderFirstName() + "\n";
     emailBody += "Card Holder Last Name: " + receiptRequest.getCardholderLastName() + "\n";
     emailBody += "Card Number: " + receiptRequest.getCardNumber() + "\n\n";
     
     for(int i = 0; i < receiptRequest.getTickets().size(); i++) {
    	 emailBody += "\nTicket " + (i + 1) + " Details: ";
    	 Ticket tempTicket = receiptRequest.getTickets().get(i);
    	 emailBody += "\nTicket ID: " + tempTicket.getId();
    	 emailBody += "\nPassenger First Name: " + tempTicket.getFirstName();
    	 emailBody += "\nPassenger Last Name: " + tempTicket.getLastName();
    	 emailBody += "\nPassenger Seat: " + tempTicket.getSeatRowNum() + tempTicket.getSeatColChar();
    	 emailBody += "\nSeat Type: " + tempTicket.getSeatType();
    	 emailBody += "\nPrice: " + tempTicket.getPrice();
    	 emailBody += "\n\nDeparture Date: " + tempTicket.getDepartureDate();
    	 emailBody += "\nOrigin: " + tempTicket.getOrigin();
    	 emailBody += "\nDestination: " + tempTicket.getDestination() + "\n";
     }
     
     emailBody += "\n\nCancel your ticket: " + cancellationLink; // Format this as needed

     // Send the email
     emailService.sendSimpleMessage(receiptRequest.getEmail(), "Your Flight Receipt", emailBody);
     return "Receipt sent successfully";
 }

 static class ReceiptRequest {
     private String email;
     private String cardholderFirstName;
     private String cardholderLastName;
     private String cardNumber;


	 private String flightDetails;

	 private List<Ticket> tickets;

     // Getter for email
     public String getEmail() {
         return email;
     }
     
     public String getCardholderFirstName() {
    	 return cardholderFirstName;
     }
     
     public void setCardholderFirstName(String cardholderFirstName) {
    	 this.cardholderFirstName = cardholderFirstName;
     }
     public String getCardholderLastName() {
    	 return cardholderLastName;
     }
     
     public void setCardholderLastName(String cardholderLastName) {
    	 this.cardholderLastName = cardholderLastName;
     }
     public String getCardNumber() {
    	 return cardNumber;
     }
     
     public void setCardNumber(String cardNumber) {
    	 this.cardNumber = cardNumber;
     }

     // Setter for email
     public void setEmail(String email) {
         this.email = email;
     }

     // Getter for flightDetails
     public String getFlightDetails() {
         return flightDetails;
     }

     // Setter for flightDetails
     public void setFlightDetails(String flightDetails) {
         this.flightDetails = flightDetails;
     }
     
     public List<Ticket> getTickets() {
         return tickets;
     }

     public void setTickets(List<Ticket> tickets) {
    	 this.tickets = new ArrayList<Ticket>();
         this.tickets = tickets;
     }

     // Getters and setters
 }
}