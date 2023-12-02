import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Confirmation = () => {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const { flightId, selectedSeatDetails, paymentInfo } = location.state || {};
  const [message, setMessage] = useState("");

  useEffect(() => {
    const updateSeatAvailability = async () => {
      try {
        // Iterate through selectedSeatDetails to update seat availability
        for (const seat of selectedSeatDetails) {
          await axios.put("http://localhost:8080/seatAssigned", {
            id: seat.id, // Assuming seat.id exists in selectedSeatDetails
          });
        }
      } catch (error) {
        console.error("Error updating seat availability:", error);
        // Handle error if needed
      }
    };

    const generateTicket = async () => {
      try {
        // Iterate through selectedSeatDetails to generate tickets
        for (const seat of selectedSeatDetails) {
          const ticketRequest = {
            flight: { id: flightId }, // Assuming flightId is available
            seatRowNum: seat.rowNum,
            seatColChar: seat.colChar,
            firstName: paymentInfo.firstName,
            lastName: paymentInfo.lastName,
            // Add any other necessary details for ticket generation
          };

          await axios.post("http://localhost:8080/ticket", ticketRequest);
        }
      } catch (error) {
        console.error("Error generating ticket:", error);
        // Handle error if needed
      }
    };

    if (selectedSeatDetails.length > 0) {
      updateSeatAvailability();
      generateTicket();
    }
  }, [flightId, selectedSeatDetails, paymentInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/send-receipt", {
        email: email,
        flightDetails: JSON.stringify({
          flightId: flightId,
          selectedSeatDetails: selectedSeatDetails,
          paymentInfo: paymentInfo,
        }),
      });

      if (response.data === "Receipt sent successfully") {
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
        <button type="submit">Send Receipt & Ticket</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Confirmation;
