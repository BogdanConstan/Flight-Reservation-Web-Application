package com.ensf614.flightreservation.repository;

import com.ensf614.flightreservation.model.Crew;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewRepository extends JpaRepository<Crew, Long> {
	Optional<Crew> findFirstByAssignedFalse();
}
