package com.ensf614.flightreservation.controller;

import com.ensf614.flightreservation.model.Location;
import com.ensf614.flightreservation.repository.LocationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
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

    @DeleteMapping("/location")
    public ResponseEntity<String> deleteLocationByDetails(@RequestParam String city, 
                                                         @RequestParam String province_state,
                                                         @RequestParam String country) {
        try {
            // Find the location by details
            Location location = locationRepository.findByCityAndProvinceStateAndCountry(city, province_state, country);

            if (location != null) {
                // If the location is found, delete it
                locationRepository.delete(location);
                return ResponseEntity.ok("Location deleted successfully");
            } else {
                // If the location is not found, return a not found response
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle exceptions and return an internal server error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting location");
        }
    }
    
    @GetMapping("/location")
    public ResponseEntity<?> getAllLocationsWithDetails() {
        try {
            List<Location> locations = locationRepository.findAll();
            List<Map<String, String>> locationDetails = new ArrayList<>();

            // Convert Location entities to maps containing city, province, and country details
            for (Location location : locations) {
                Map<String, String> locationMap = new HashMap<>();
                locationMap.put("city", location.getCity());
                locationMap.put("provinceState", location.getProvince_state());
                locationMap.put("country", location.getCountry());
                locationDetails.add(locationMap);
            }

            return ResponseEntity.status(HttpStatus.OK).body(locationDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching locations");
        }
    }

    /*@GetMapping("/location")
    public ResponseEntity<?> getAllLocations() {
        try {
            List<Location> locations = locationRepository.findAll();

            Map<String, Object> locationInfo = new HashMap<>();
            locationInfo.put("locations", locations);
            return ResponseEntity.status(HttpStatus.OK).body(locationInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching locations");
        }
    }*/
}


