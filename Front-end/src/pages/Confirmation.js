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
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const generateTickets = async () => {
      try {
        const ticketRequests = passengerInfo.map((passenger, index) => {
          const seat = selectedSeatDetails[index];
          return {
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
        });

        const response = await axios.post(
          "http://localhost:8080/tickets",
          ticketRequests
        );

        setTickets(response.data);
      } catch (error) {
        console.error("Error generating tickets:", error);
      }
    };

    if (selectedSeatDetails.length > 0) {
      generateTickets();
    }
  }, [flightId, selectedSeatDetails, paymentInfo, passengerInfo]);

  const fetchTicketsByFlightIdAndSeat = async (flightId, rowNum, colChar) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/ticket/search`,
        {
          params: { flight: { id: flightId }, rowNum, colChar },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return [];
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Ensure tickets are generated before sending the receipt
      if (tickets.length === 0) {
        setMessage("Tickets are being generated. Please wait.");
        return; // Exit early if tickets are not generated yet
      }

      const response = await axios.post("http://localhost:8080/send-receipt", {
        email: email,
        cardholderFirstName: paymentInfo.cardholderFirstName,
        cardholderLastName: paymentInfo.cardholderLastName,
        cardNumber: paymentInfo.cardNumber,
        tickets: tickets,
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
