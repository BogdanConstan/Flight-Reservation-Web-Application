package com.ensf614.flightreservation.controller;

import com.ensf614.flightreservation.model.Crew;
import com.ensf614.flightreservation.model.Location;
import com.ensf614.flightreservation.repository.LocationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("*")
@RestController
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @PostMapping("/location")
    public ResponseEntity<?> addLocation(@RequestBody Location newLocation) {
        try {
            Location savedLocation = locationRepository.save(newLocation);

            Map<String, Object> locationInfo = new HashMap<>();
            locationInfo.put("location", savedLocation);
            return ResponseEntity.status(HttpStatus.CREATED).body(locationInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding location");
        }
    }

    @DeleteMapping("/location/{id}") // Endpoint to delete an aircraft and its seats
    public ResponseEntity<String> deleteLocation(@PathVariable Long id) {
        Optional<Location> locationOptional = locationRepository.findById(id);

        if (locationOptional.isPresent()) {
            Location location = locationOptional.get();
            // Delete the location
            locationRepository.delete(location);

            return ResponseEntity.ok("Location deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/location")
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locationList = locationRepository.findAll();
        return ResponseEntity.ok(locationList);
    }

}


