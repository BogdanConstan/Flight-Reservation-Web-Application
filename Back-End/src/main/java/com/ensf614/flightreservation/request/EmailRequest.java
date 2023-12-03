package com.ensf614.flightreservation.request;

import java.util.List;

public class EmailRequest {

	private Long flightId;
    private String departureDate;
    private String origin;
    private String destination;
    private List<PassengerInfo> passengerInfo;

    // getters and setters
    public Long getFlightId() {
    	return flightId;
    }
    
    public void setFlightId(Long flightId) {
    	this.flightId = flightId;
    }
    
    public String getDepartureDate() {
    	return departureDate;
    }
    
    public void setDepartureDate(String departureDate) {
    	this.departureDate = departureDate;
    }
    
    public String getOrigin() {
    	return origin;
    }
    
    public void setOrigin(String origin) {
    	this.origin = origin;
    }
    
    public String getDestination() {
    	return destination;
    }
    
    public void setDestination(String destination) {
    	this.destination = destination;
    }
    
    public List<PassengerInfo> getPassengerInfo() {
    	return passengerInfo;
    }
    
    public void setPassengerInfo(List<PassengerInfo> passengerInfo) {
    	this.passengerInfo = passengerInfo;
    }
    
    public static class PassengerInfo {
		private String firstName;
        private String lastName;
        private String seatRowNum;
        private String seatColChar;
        private Long ticketId;

        // getters and setters
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
        public String getSeatRowNum() {
        	return seatRowNum;
        }
        public void setSeatRowNum(String seatRowNum) {
        	this.seatRowNum = seatRowNum;
        }
        public String getSeatColChar() {
        	return seatColChar;
        }
        public void setSeatColChar(String seatColChar) {
        	this.seatColChar = seatColChar;
        }
        public Long getTicketId() {
        	return ticketId;
        }
        public void setTicketId(Long ticketId) {
        	this.ticketId = ticketId;
        }
        
    }
}