package com.ensf614.flightreservation.controller;

import com.ensf614.flightreservation.model.Seat;
import com.ensf614.flightreservation.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Optional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
public class SeatController {
	@Autowired
	private SeatRepository seatRepository;
	
	@PutMapping("/seatAssigned")
	@Transactional
	public ResponseEntity<?> assignSeat(@RequestBody Seat seat) {
        try {
            seat.setAvailability(!seat.isAvailability());
        	Seat assignedSeat = seatRepository.save(seat);
            

            // Constructing response payload
            Map<String, Object> seatInfo = new HashMap<>();
            seatInfo.put("crew", assignedSeat);
            return ResponseEntity.status(HttpStatus.CREATED).body(seatInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding crew");
        }
    }
	
	@GetMapping("/seats/{aircraftId}")
	@Transactional
	public ResponseEntity<List<Seat>> getSeatsByAircraftId(@PathVariable Long aircraftId) {
	    try {
	        // Here, you can use the aircraftId to retrieve seats associated with that aircraft
	        List<Seat> seats = seatRepository.findByAircraftId(aircraftId); // Assuming a method in SeatRepository for this query
	        return ResponseEntity.ok(seats);
	    } catch (Exception e) {
	    	return ResponseEntity.notFound().build();
	    }
	}
	
    
	
	
}

