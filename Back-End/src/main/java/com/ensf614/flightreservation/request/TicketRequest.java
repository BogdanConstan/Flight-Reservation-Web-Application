package com.ensf614.flightreservation.request;

import com.ensf614.flightreservation.model.Flight;

public class TicketRequest {

    private Flight flight;
    private int seatRowNum;
    private char seatColChar;
    private String firstName;
    private String lastName;

    private String cardholderFirstName;
    private String cardholderLastName;
    private String cardNumber;
    private String cardCVC;
    private String expiry;

    // Constructors, getters, and setters

    // Constructor without arguments (default constructor)
    public TicketRequest() {
    }

    // Constructor with all fields
    public TicketRequest(
            Flight flight,
            int seatRowNum,
            char seatColChar,
            String firstName,
            String lastName,
            String cardholderFirstName,
            String cardholderLastName,
            String cardNumber,
            String cardCVC,
            String expiry
    ) {
        this.flight = flight;
        this.seatRowNum = seatRowNum;
        this.seatColChar = seatColChar;
        this.firstName = firstName;
        this.lastName = lastName;
        this.cardholderFirstName = cardholderFirstName;
        this.cardholderLastName = cardholderLastName;
        this.cardNumber = cardNumber;
        this.cardCVC = cardCVC;
        this.expiry = expiry;
    }

    // Getters and setters

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
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
}

