package com.ensf614.flightreservation.repository;

import com.ensf614.flightreservation.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
	
	/**
	 * Query to find a user by username.
	 * @param username
	 * @return User (if found); null (if not found)
	 */
	Optional<User> findByUsername(String username);
}
