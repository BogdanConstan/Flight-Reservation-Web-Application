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
 
 
 @CrossOrigin(origins = "http://localhost:3000")
 @PostMapping("/send-receipt")
 public String sendReceipt(@RequestBody ReceiptRequest receiptRequest) {
     String receiptInfo = "Flight Details: " + receiptRequest.getFlightDetails(); // Format this as needed
     emailService.sendSimpleMessage(receiptRequest.getEmail(), "Your Flight Receipt", receiptInfo);
     return "Receipt sent successfully";
 }

 static class ReceiptRequest {
     private String email;
     private String flightDetails;

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

     // Getters and setters
 }
}

