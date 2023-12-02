import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flightId, aircraftId, selectedSeats } = location.state || {};
  const [selectedSeatDetails, setSelectedSeatDetails] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    firstName: "",
    lastName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    email: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleCheckout = () => {
    navigate("/confirmation", {
      state: {
        flightId: flightId,
        aircraftId: aircraftId,
        selectedSeatDetails: selectedSeatDetails,
        paymentInfo: paymentInfo
      },
    });
  };

  useEffect(() => {
    const fetchSeatDetails = async () => {
      const seatDetails = [];

      // Iterate through each selected seat
      for (const seat of selectedSeats) {
        const match = seat.match(/^(\d+)([A-Z]+)$/);
        if (match) {
          const rowNum = parseInt(match[1], 10);
          const colChar = match[2];

          try {
            const response = await axios.get(
              `http://localhost:8080/seats/${aircraftId}/${rowNum}/${colChar}`
            );

            const fetchedSeat = response.data;
            seatDetails.push(fetchedSeat);
          } catch (error) {
            console.error("Error fetching seat details:", error);
            // Handle error as needed
          }
        }
      }

      setSelectedSeatDetails(seatDetails);
    };

    if (selectedSeats.length > 0 && aircraftId) {
      fetchSeatDetails();
    }
  }, [aircraftId, selectedSeats]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payment Page</h2>

      {/* Displaying Flight ID */}
      {flightId && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Flight ID: {flightId}</h3>
        </div>
      )}

      {/* Displaying selected seats */}
      <div>
        <h3>Selected Seats:</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {selectedSeatDetails &&
            selectedSeatDetails.map((seat, index) => (
              <li
                key={index}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p>Seat: {seat.rowNum}{seat.colChar}</p>
                <p>Seat Type: {`${seat.seatType}`}</p>
                <p>Seat Price: ${`${seat.price}`}</p>
              </li>
            ))}
        </ul>
      </div>

      {/* Payment Information Form */}
      <div style={{ marginTop: "20px" }}>
        <h3>Payment Information:</h3>
        <form>
          <div style={{ marginBottom: "10px" }}>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={paymentInfo.firstName}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={paymentInfo.lastName}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Card Expiry:
              <input
                type="text"
                name="cardExpiry"
                value={paymentInfo.cardExpiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
              />
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              CVC:
              <input
                type="text"
                name="cardCVC"
                value={paymentInfo.cardCVC}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Email Address:
              <input
                type="email"
                name="email"
                value={paymentInfo.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </form>
      </div>

      {/* Confirm Checkout Button */}
      <button
        style={{
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "20px",
        }}
        onClick={handleCheckout}
      >
        Confirm Checkout
      </button>
    </div>
  );
};

export default Payment;
