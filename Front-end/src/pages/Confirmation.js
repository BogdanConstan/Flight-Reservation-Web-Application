import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";

const Confirmation = () => {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const {
    flightId,
    selectedSeatDetails,
    paymentInfo,
    passengerInfo,
  } = location.state || {};
  const [message, setMessage] = useState("");

  useEffect(() => {
    const updateSeatAvailability = async () => {
      try {
        for (const seat of selectedSeatDetails) {
          await axios.put("http://localhost:8080/seatAssigned", {
            id: seat.id,
          });
        }
      } catch (error) {
        console.error("Error updating seat availability:", error);
      }
    };

    const generateTicket = async () => {
      try {
        const ticketRequests = [];

        for (let i = 0; i < selectedSeatDetails.length; i++) {
          const seat = selectedSeatDetails[i];
          const passenger = passengerInfo[i];

          const ticketRequest = {
            flight: {
              id: flightId,
            },
            seatRowNum: seat.rowNum,
            seatColChar: seat.colChar,
            firstName: passenger.firstName,
            lastName: passenger.lastName,
            cardholderFirstName: paymentInfo.cardholderFirstName,
            cardholderLastName: paymentInfo.cardholderLastName,
            cardNumber: paymentInfo.cardNumber,
            cardCVC: paymentInfo.cardCVC,
            expiry: paymentInfo.cardExpiry,
          };

          ticketRequests.push(ticketRequest);
        }

        console.log(paymentInfo);
        console.log(ticketRequests);

        await axios.post("http://localhost:8080/tickets", ticketRequests);
      } catch (error) {
        console.error("Error generating ticket:", error);
      }
    };

    if (selectedSeatDetails.length > 0) {
      updateSeatAvailability();
      generateTicket();
    }
  }, [flightId, selectedSeatDetails, paymentInfo, passengerInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/send-receipt", {
        email: email,
        flightDetails: JSON.stringify({
          flightId: flightId,
          selectedSeatDetails: selectedSeatDetails,
          paymentInfo: paymentInfo,
          passengerInfo: passengerInfo,
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
    <Container maxWidth="sm" style={{ marginTop: "30px" }}>
      <Typography variant="h4" gutterBottom>
        Thank You for Flying with Us
      </Typography>
      <Paper
        style={{ padding: "20px", marginTop: "20px", marginBottom: "20px" }}
      >
        <Typography variant="h6">Confirm Your Booking</Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            variant="outlined"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            Send Receipt & Ticket
          </Button>
        </form>
      </Paper>
      {message && (
        <Box mt={2}>
          <Typography color="textSecondary">{message}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Confirmation;
