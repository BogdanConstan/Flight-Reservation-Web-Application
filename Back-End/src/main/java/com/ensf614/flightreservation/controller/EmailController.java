package com.ensf614.flightreservation.controller;

//EmailController.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ensf614.flightreservation.model.EmailService;

@RestController
public class EmailController {

 @Autowired
 private EmailService emailService;
 
 
 @CrossOrigin("*")
 @PostMapping("/send-receipt")
 public String sendReceipt(@RequestBody ReceiptRequest receiptRequest) {
     // Assuming that receiptRequest contains a ticketId or similar identifier
     Long ticketId = receiptRequest.getTicketId();

     // Construct the cancellation link
     String cancellationLink = "http://localhost:3000/cancellation";
     
     

     // Create the email body including the flight details and cancellation link
     String emailBody = "Flight Details: " + receiptRequest.getFlightDetails() 
                      + "\n\nCancel your ticket: " + cancellationLink; // Format this as needed

     // Send the email
     emailService.sendSimpleMessage(receiptRequest.getEmail(), "Your Flight Receipt", emailBody);
     return "Receipt sent successfully";
 }

 static class ReceiptRequest {
     private String email;
     private String flightDetails;
     private Long ticketid;

     // Getter for email
     public String getEmail() {
         return email;
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
     
     public Long getTicketId() {
         return ticketid;
     }

     public void setTicketId(Long ticketId) {
         this.ticketid = ticketId;
     }

     // Getters and setters
 }
}

