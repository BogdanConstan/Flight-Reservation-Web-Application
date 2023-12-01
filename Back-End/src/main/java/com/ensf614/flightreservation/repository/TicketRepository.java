package com.ensf614.flightreservation.repository;

import com.ensf614.flightreservation.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    // You can add custom query methods here if needed
}