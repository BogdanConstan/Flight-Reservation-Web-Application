package com.ensf614.flightreservation.repository;

import com.ensf614.flightreservation.model.Location;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
	Location findByCity(String cityName);
}


