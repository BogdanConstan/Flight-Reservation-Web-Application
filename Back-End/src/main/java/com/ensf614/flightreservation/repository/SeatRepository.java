package com.ensf614.flightreservation.repository;

import com.ensf614.flightreservation.model.Aircraft;
import com.ensf614.flightreservation.model.Seat;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long> {
	List<Seat> findByAircraftId(Long aircraftId);
	Seat findByAircraftIdAndRowNumAndColChar(Long aircraftId, Integer rowNum, Character colChar);
}
