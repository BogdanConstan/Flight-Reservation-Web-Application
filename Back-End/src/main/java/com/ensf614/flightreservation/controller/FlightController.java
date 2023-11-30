package com.ensf614.flightreservation.controller;

import com.ensf614.flightreservation.model.Aircraft;
import com.ensf614.flightreservation.repository.AircraftRepository;
import com.ensf614.flightreservation.model.Flight;
import com.ensf614.flightreservation.model.Seat;
import com.ensf614.flightreservation.repository.FlightRepository;
import com.ensf614.flightreservation.model.Crew;
import com.ensf614.flightreservation.repository.CrewRepository;
import com.ensf614.flightreservation.model.Location;
import com.ensf614.flightreservation.repository.LocationRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FlightController {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private AircraftRepository aircraftRepository;
    
    @Autowired
    private CrewRepository crewRepository;
    
    @Autowired
    private LocationRepository locationRepository;
    
    @PostMapping("/flight")
    @Transactional
    public ResponseEntity<?> addFlight(@RequestBody Flight newFlight) {
        Optional<Aircraft> availableAircraftOptional = aircraftRepository.findFirstByAssignedFalse();
        if (availableAircraftOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("No available aircraft for assignment");
        }
        
        Optional<Crew> availableCrewOptional = crewRepository.findFirstByAssignedFalse();
        if (availableCrewOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("No available crew for assignment");
        }
        
        Aircraft availableAircraft = availableAircraftOptional.get();
        availableAircraft.setAssigned(true);
        availableAircraft.setFlight(newFlight);
        aircraftRepository.save(availableAircraft);

        
        Crew availableCrew = availableCrewOptional.get();
        availableCrew.setAssigned(true);
        availableCrew.setFlight(newFlight);
        crewRepository.save(availableCrew);
        
        Flight savedFlight = flightRepository.save(newFlight);

        savedFlight.setAircraft(availableAircraft); // Set the assigned aircraft in the flight
        savedFlight.setCrew(availableCrew);
        
        //Location origin = locationRepository.findByCity(cityOrigin);
        //Location destination = locationRepository.findByCity(cityDest);

        /*if (origin != null && destination != null) {
            savedFlight.setOrigin(origin);
            savedFlight.setDestination(destination);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Origin or Destination with city name not found");
        }*/
        flightRepository.save(savedFlight);

        // Constructing response payload
        Map<String, Object> flightAircraftInfo = new HashMap<>();
        flightAircraftInfo.put("flight", savedFlight);
        flightAircraftInfo.put("aircraft", availableAircraft);
        flightAircraftInfo.put("crew", availableCrew);
        //flightAircraftInfo.put("origin", origin);
        //flightAircraftInfo.put("destination", destination);

        //return ResponseEntity.status(HttpStatus.CREATED).body(flightAircraftInfo);
        return ResponseEntity.ok(flightAircraftInfo);
    }
    /*@PostMapping("/flight")
    @Transactional
    public ResponseEntity<?> addFlight(@RequestBody Flight newFlight) {
        Optional<Aircraft> availableAircraftOptional = aircraftRepository.findFirstByAssignedFalse();
        if (availableAircraftOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("No available aircraft for assignment");
        }
        
        Optional<Crew> availableCrewOptional = crewRepository.findFirstByAssignedFalse();
        if (availableCrewOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("No available crew for assignment");
        }
        
        Aircraft availableAircraft = availableAircraftOptional.get();
        availableAircraft.setAssigned(true);
        availableAircraft.setFlight(newFlight);
        aircraftRepository.save(availableAircraft);

        
        Crew availableCrew = availableCrewOptional.get();
        availableCrew.setAssigned(true);
        availableCrew.setFlight(newFlight);
        crewRepository.save(availableCrew);
        
        Flight savedFlight = flightRepository.save(newFlight);

        savedFlight.setAircraft(availableAircraft); // Set the assigned aircraft in the flight
        savedFlight.setCrew(availableCrew);
        flightRepository.save(savedFlight);

        // Constructing response payload
        Map<String, Object> flightAircraftInfo = new HashMap<>();
        flightAircraftInfo.put("flight", savedFlight);
        flightAircraftInfo.put("aircraft", availableAircraft);
        flightAircraftInfo.put("crew", availableCrew);

        //return ResponseEntity.status(HttpStatus.CREATED).body(flightAircraftInfo);
        return ResponseEntity.ok(flightAircraftInfo);
    }*/
    
    @DeleteMapping("/flight/{id}") // Endpoint to delete a flight
    public ResponseEntity<String> deleteFlight(@PathVariable Long id) {
        Optional<Flight> flightOptional = flightRepository.findById(id);

        if (flightOptional.isPresent()) {
            Flight flight = flightOptional.get();
            Aircraft assignedAircraft = flight.getAircraft();
            Crew assignedCrew = flight.getCrew();
            
            if (assignedAircraft != null) {
                assignedAircraft.setAssigned(false);
                assignedAircraft.setFlight(null); // Remove the reference to the flight
                aircraftRepository.save(assignedAircraft);
            }
            
            if (assignedCrew != null) {
                assignedCrew.setAssigned(false);
                assignedCrew.setFlight(null); // Remove the reference to the crew
                crewRepository.save(assignedCrew);
            }

            flightRepository.delete(flight);

            return ResponseEntity.ok("Flight deleted and aircraft and crew released");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/flight/{id}")
    public ResponseEntity<?> getFlightWithAircraft(@PathVariable Long id) {
        try {
            Optional<Flight> flightOptional = flightRepository.findById(id);

            if (flightOptional.isPresent()) {
                Flight flight = flightOptional.get();
                Aircraft aircraft = flight.getAircraft();
                Crew crew = flight.getCrew();
               
                Map<String, Object> flightAircraftInfo = new HashMap<>();
                flightAircraftInfo.put("flight", flight);
                flightAircraftInfo.put("aircraft", aircraft);
                flightAircraftInfo.put("crew", crew);

                return ResponseEntity.status(HttpStatus.OK).body(flightAircraftInfo);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Flight not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching flight details");
        }
    }
    
    @GetMapping("/flights")
    public ResponseEntity<?> getAllFlights() {
        try {
            List<Flight> flights = flightRepository.findAll();

            if (!flights.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body(flights);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No flights found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching flights");
        }
    }
    
    // Other methods...
}

