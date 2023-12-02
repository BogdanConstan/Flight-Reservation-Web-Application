package com.ensf614.flightreservation.controller;

import com.ensf614.flightreservation.model.Payment;
import com.ensf614.flightreservation.model.Ticket;
import com.ensf614.flightreservation.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentController(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // GET all payments
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // GET a specific payment by ID
    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    // POST a new payment
    @PostMapping
    public Payment createPayment(@RequestBody Payment paymentRequest) {
    	
    	// Extract all relevant information from the request.
    	String cardholderFirstName = paymentRequest.getCardholderFirstName();
    	String cardholderLastName = paymentRequest.getCardholderLastName();
    	String cardNumber = paymentRequest.getCardNumber();
    	String cardCVC = paymentRequest.getCardCVC();
    	String expiry = paymentRequest.getExpiry();
		LocalDateTime paymentDate = paymentRequest.getPaymentDate();
    	
    	Payment newPayment = new Payment(cardholderFirstName, cardholderLastName, cardNumber, cardCVC, expiry);
    	
        return paymentRepository.save(newPayment);
    }

    // DELETE a payment by ID
    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        paymentRepository.deleteById(id);
    }
}