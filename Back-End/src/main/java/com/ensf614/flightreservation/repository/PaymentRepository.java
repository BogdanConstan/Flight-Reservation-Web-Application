package com.ensf614.flightreservation.repository;

import com.ensf614.flightreservation.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
	// Custom query methods can be added here if needed.
}
