package com.ensf614.flightreservation.repository;

import com.ensf614.flightreservation.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long> {

}
