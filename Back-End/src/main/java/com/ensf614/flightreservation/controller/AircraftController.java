package com.ensf614.flightreservation.controller;
import com.ensf614.flightreservation.model.Aircraft;
import com.ensf614.flightreservation.repository.AircraftRepository;
import com.ensf614.flightreservation.model.Seat;
import com.ensf614.flightreservation.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Optional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
public class AircraftController {

    @Autowired
    private AircraftRepository aircraftRepository;

    @Autowired
    private SeatRepository seatRepository;

    @PostMapping("/aircraft") // Endpoint to add a new aircraft and seats
    @Transactional // Enable transaction management for this method
    public ResponseEntity<?> addAircraftWithSeats(@RequestBody Aircraft newAircraft) {
        try {
        	
        	// Set the number of rows and columns representing seat allocation on the aircraft.
        	newAircraft.setNumRows(20);
            newAircraft.setNumCols(6);

            // Save the aircraft to get its ID
            Aircraft savedAircraft = aircraftRepository.save(newAircraft);

            // Generate and add seats to the aircraft.
            generateAndAddSeats(savedAircraft);

            // Construct the response payload.
            Map<String, Object> aircraftSeatInfo = new HashMap<>();
            aircraftSeatInfo.put("aircraft", savedAircraft);
            aircraftSeatInfo.put("seats", savedAircraft.getSeats()); // Retrieve and add seats to the response payload

            return ResponseEntity.status(HttpStatus.CREATED).body(aircraftSeatInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding aircraft and seats");
        }
    }
    /*Aircraft addAircraftWithSeats(@RequestBody Aircraft newAircraft) {
        // Save the aircraft to get its ID
        Aircraft savedAircraft = aircraftRepository.save(newAircraft);

        // Generate and add seats to the aircraft
        generateAndAddSeats(savedAircraft);

        return savedAircraft;
    }*/

    
    /**
     * Generate and add seats to an aircraft.
     * @param aircraft
     */
    private void generateAndAddSeats(Aircraft aircraft) {
        int numRows = aircraft.getNumRows();
        int numCols = aircraft.getNumCols();
        int numBusiness = (int) (numRows * numCols * 0.1);
		int numComfort = (int) (numRows * numCols * 0.2);
		int counter = 0;
		
		for (int i = 0; i < numRows; i++) {
			for (int j = 0; j < numCols; j++) {
                Seat seat;
                if (counter <= numBusiness) {
                    seat = new Seat(i + 1, (char) (j + 65), true, "Business");
                } else if (counter > numBusiness && counter <= numComfort) {
                    seat = new Seat(i + 1, (char) (j + 65), true, "Comfort");
                } else {
                    seat = new Seat(i + 1, (char) (j + 65), true, "Ordinary");
                }
                seat.setAircraft(aircraft);
                seatRepository.save(seat);
                aircraft.addSeat(seat);
                counter++;
			}
		}	
    }
    @DeleteMapping("/aircraft/{id}") // Endpoint to delete an aircraft and its seats
    public ResponseEntity<String> deleteAircraft(@PathVariable Long id) {
        Optional<Aircraft> aircraftOptional = aircraftRepository.findById(id);

        if (aircraftOptional.isPresent()) {
            Aircraft aircraft = aircraftOptional.get();

            // Delete seats associated with the aircraft
            List<Seat> seats = aircraft.getSeats();
            seatRepository.deleteAll(seats);

            // Delete the aircraft
            aircraftRepository.delete(aircraft);

            return ResponseEntity.ok("Aircraft and associated seats deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/aircraft/{id}") // Endpoint to get aircraft details with seat information
    public ResponseEntity<?> getAircraftWithSeats(@PathVariable Long id) {
        Optional<Aircraft> aircraftOptional = aircraftRepository.findById(id);

        if (aircraftOptional.isPresent()) {
            Aircraft aircraft = aircraftOptional.get();
            List<Seat> seats = aircraft.getSeats();

            // You can create a custom DTO to combine aircraft and seat information
            // Here, we are using a Map to hold both details
            Map<String, Object> aircraftSeatInfo = new HashMap<>();
            aircraftSeatInfo.put("aircraft", aircraft);
            aircraftSeatInfo.put("seats", seats);

            return ResponseEntity.ok(aircraftSeatInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/aircraft")
    public ResponseEntity<List<Aircraft>> getAllAircrafts() {
        List<Aircraft> aircraftList = aircraftRepository.findAll();
        return ResponseEntity.ok(aircraftList);
    }
    
    @GetMapping("/aircraftId/{flightId}")
    public ResponseEntity<Long> getAircraftIdByFlightId(@PathVariable Long flightId) {
        Optional<Aircraft> aircraftOptional = aircraftRepository.findByFlightID(flightId);

        if (aircraftOptional.isPresent()) {
        	Aircraft aircraft = aircraftOptional.get();
        	
            return ResponseEntity.ok(aircraft.getId());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

