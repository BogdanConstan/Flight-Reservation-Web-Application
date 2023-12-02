import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Confirmation = () => {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const { flightId, selectedSeats } = location.state || {}; // Retrieve flightId and selectedSeats
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Construct flightDetails object or string as needed
    const flightDetails = {
      flightId: flightId,
      selectedSeats: selectedSeats,
      // Add any other details if needed
    };

    try {
      console.log(JSON.stringify({ email, flightDetails }));
      const response = await fetch("http://localhost:8080/send-receipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, flightDetails }),
      });

      if (response.ok) {
        setMessage("Receipt sent successfully to your email.");
      } else {
        setMessage("Failed to send receipt. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Thank You for Flying with Us</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Send Receipt</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Confirmation;
