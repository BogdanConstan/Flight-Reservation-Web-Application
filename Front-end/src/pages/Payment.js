import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flightId, selectedSeats } = location.state || {};

  const handleCheckout = () => {
    navigate("/confirmation", {
      state: {
        flightId: flightId,
        selectedSeats: selectedSeats,
      },
    });
  };

  return (
    <div>
      <h2>Payment Page</h2>

      {/* Displaying Flight ID */}
      {flightId && (
        <div>
          <h3>Flight ID: {flightId}</h3>
        </div>
      )}

      {/* Displaying selected seats */}
      <div>
        <h3>Selected Seats:</h3>
        <ul>
          {selectedSeats &&
            selectedSeats.map((seat, index) => <li key={index}>{seat}</li>)}
        </ul>
      </div>

      {/* Confirm Checkout Button */}
      <button onClick={handleCheckout}>Confirm Checkout</button>
    </div>
  );
};

export default Payment;
