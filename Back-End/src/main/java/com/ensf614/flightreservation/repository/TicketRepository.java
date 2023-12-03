package com.ensf614.flightreservation.repository;

import com.ensf614.flightreservation.model.Ticket;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
	List<Ticket> findByFlightId(Long flightId);
}