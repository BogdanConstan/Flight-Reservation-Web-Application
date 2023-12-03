import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

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
    email: "",
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
        paymentInfo: paymentInfo,
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
    <Container maxWidth="md" style={{ marginTop: "30px" }}>
      <Typography variant="h4" gutterBottom>
        Payment Page
      </Typography>

      {flightId && (
        <Typography variant="h6" gutterBottom>
          Flight ID: {flightId}
        </Typography>
      )}

      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Selected Seats:</Typography>
        <List>
          {selectedSeatDetails &&
            selectedSeatDetails.map((seat, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`Seat: ${seat.rowNum}${seat.colChar}`}
                  secondary={`Seat Type: ${seat.seatType} - Seat Price: $${seat.price}`}
                />
              </ListItem>
            ))}
        </List>
      </Paper>

      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Payment Information:
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            label="First Name"
            name="firstName"
            value={paymentInfo.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={paymentInfo.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Card Number"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Card Expiry"
            name="cardExpiry"
            value={paymentInfo.cardExpiry}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="MM/YY"
          />
          <TextField
            label="CVC"
            name="cardCVC"
            value={paymentInfo.cardCVC}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={paymentInfo.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={handleCheckout}
          >
            Confirm Checkout
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Payment;
