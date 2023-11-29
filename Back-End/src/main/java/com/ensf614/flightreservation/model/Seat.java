package com.ensf614.flightreservation.model;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int rowNum;
    private char colChar;
    private boolean availability;
    private String seatType;
    private static final float BASE_PRICE = 100;
    private double price;
    
    @JsonBackReference
    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "aircraftid")
    private Aircraft aircraft;

    public Seat() {
        // Default constructor
    }

    public Seat(int rowNum, char colChar, boolean availability, String seatType) {
        this.rowNum = rowNum;
        this.colChar = colChar;
        this.availability = availability;
        this.seatType = seatType;
        calculatePrice();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getRowNum() {
        return rowNum;
    }

    public void setRowNum(int rowNum) {
        this.rowNum = rowNum;
    }

    public char getColChar() {
        return colChar;
    }

    public void setColChar(char colChar) {
        this.colChar = colChar;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    public String getSeatType() {
        return seatType;
    }

    public void setSeatType(String seatType) {
        this.seatType = seatType;
        calculatePrice();
    }

    public double getPrice() {
        return price;
    }

    private void calculatePrice() {
        if ("Ordinary".equals(seatType)) {
            price = BASE_PRICE;
        } else if ("Comfort".equals(seatType)) {
            price = BASE_PRICE * 1.4;
        } else if ("Business".equals(seatType)) {
            price = BASE_PRICE * 2;
        }
    }

    public Aircraft getAircraft() {
        return aircraft;
    }

    public void setAircraft(Aircraft aircraft) {
        this.aircraft = aircraft;
    }
    
    @Override
    public String toString() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Error converting object to JSON";
        }
    }
}

