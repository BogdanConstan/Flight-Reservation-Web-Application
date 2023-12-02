package com.ensf614.flightreservation.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class Payment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "paymentid")
	private Long id;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "payment", cascade = CascadeType.ALL)
	private List<Ticket> tickets = new ArrayList<>();
	
	// Payment-specific fields.
	private String cardholderFirstName;
	private String cardholderLastName;
	private String cardNumber;
	private String cardCVC;
	private String expiry;
	private double amount;
	private LocalDateTime paymentDate;
	
	// Default Constructor.
	public Payment() {
		
	}
	
	// Constructor for Payment that takes in all required information.
	public Payment(String a, String b, String c, String d, String e) {
		this.cardholderFirstName = a;
		this.cardholderLastName = b;
		this.cardNumber = c;
		this.cardCVC = d;
		this.expiry = e;
		this.amount = tickets.stream().mapToDouble(Ticket::getPrice).sum();
		this.paymentDate = LocalDateTime.now();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;

        // Update the total amount based on the sum of ticket prices
        updateTotalAmount();
    }

    private void updateTotalAmount() {
    	this.amount = 0;
        if (tickets != null) {
            for (Ticket t: tickets) {
            	this.amount += t.getPrice();
            }
        }
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

	public String getCardCVC() {
		return cardCVC;
	}

	public void setCardCVC(String cardCVC) {
		this.cardCVC = cardCVC;
	}

	public String getExpiry() {
		return expiry;
	}

	public void setExpiry(String expiry) {
		this.expiry = expiry;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public LocalDateTime getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDateTime paymentDate) {
		this.paymentDate = paymentDate;
	}
	
	
}
