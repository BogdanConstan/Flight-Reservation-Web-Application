package com.ensf614.flightreservation.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class User {
	
	// User attributes.
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private String email;
	
	// Constructor (default).
	public User() {
	}
	
	// Constructor (parametrized).
	public User(String username, String password, String firstName, String lastName, String email) {
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}
	
	/**
	 * Getter for id.
	 * @return id
	 */
	public Long getId() {
		return id;
	}
	
	/**
	 * Setter for id.
	 * @param id
	 */
	public void setId(Long id) {
		this.id = id;
	}
	
	/**
	 * Getter for username.
	 * @return username
	 */
	public String getUsername() {
		return username;
	}
	
	/**
	 * Setter for username.
	 * @param username
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	
	/**
	 * Getter for password.
	 * @return
	 */
	public String getPassword() {
		return password;
	}
	
	/**
	 * Setter for password.
	 * @param password
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	
	/**
	 * Getter for firstName.
	 * @return
	 */
	public String getFirstName() {
		return firstName;
	}
	
	/**
	 * Setter for firstName.
	 * @param firstName
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	/**
	 * Getter for lastName.
	 * @return lastName.
	 */
	public String getLastName() {
		return lastName;
	}
	
	/**
	 * Setter for lastName.
	 * @param lastName
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	/**
	 * Getter for email.
	 * @return email
	 */
	public String getEmail() {
		return email;
	}
	
	/**
	 * Setter for email.
	 * @param email
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
