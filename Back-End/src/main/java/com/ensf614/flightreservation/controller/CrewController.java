package com.ensf614.flightreservation.controller;

import com.ensf614.flightreservation.model.Aircraft;
import com.ensf614.flightreservation.model.Crew;
import com.ensf614.flightreservation.model.Seat;
import com.ensf614.flightreservation.repository.CrewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Optional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CrewController {
	@Autowired
	private CrewRepository crewRepository;
	
	@PostMapping("/crew")
	@Transactional
	public ResponseEntity<?> addCrew(@RequestBody Crew newCrew) {
        try {
            // Save the aircraft to get its ID
            crewRepository.save(newCrew);

            // Constructing response payload
            Map<String, Object> crewInfo = new HashMap<>();
            crewInfo.put("crew", newCrew);
            return ResponseEntity.status(HttpStatus.CREATED).body(crewInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding crew");
        }
    }
	
    @DeleteMapping("/crew/{id}") // Endpoint to delete an aircraft and its seats
    public ResponseEntity<String> deleteCrew(@PathVariable Long id) {
        Optional<Crew> crewOptional = crewRepository.findById(id);

        if (crewOptional.isPresent()) {
            Crew crew = crewOptional.get();
            // Delete the crew
            crewRepository.delete(crew);

            return ResponseEntity.ok("Crew deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	
}
