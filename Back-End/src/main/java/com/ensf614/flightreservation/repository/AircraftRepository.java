package com.ensf614.flightreservation.repository;

import com.ensf614.flightreservation.model.Aircraft;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AircraftRepository extends JpaRepository<Aircraft, Long> {
	Optional<Aircraft> findFirstByAssignedFalse();
}
