package com.ensf614.flightreservation.repository;

import com.ensf614.flightreservation.model.Flight;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {
	List<Flight> findByOriginAndDestinationAndDepartureDate(String origin, String destination, LocalDate departureDate);
}
