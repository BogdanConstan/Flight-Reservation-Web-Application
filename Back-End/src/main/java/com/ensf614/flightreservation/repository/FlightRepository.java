package com.ensf614.flightreservation.repository;

import com.ensf614.flightreservation.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {

}
