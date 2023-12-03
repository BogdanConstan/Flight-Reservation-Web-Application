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
  const [passengerInfo, setPassengerInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    email: "",
    cardholderFirstName: "", // Added cardholder first name
    cardholderLastName: "", // Added cardholder last name
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handlePassengerInfoChange = (index, field, value) => {
    const updatedPassengerInfo = [...passengerInfo];
    updatedPassengerInfo[index] = {
      ...updatedPassengerInfo[index],
      [field]: value,
    };
    setPassengerInfo(updatedPassengerInfo);
  };

  const handleCheckout = () => {
    navigate("/confirmation", {
      state: {
        flightId: flightId,
        aircraftId: aircraftId,
        selectedSeatDetails: selectedSeatDetails,
        passengerInfo: passengerInfo,
        paymentInfo: paymentInfo,
      },
    });
  };

  useEffect(() => {
    const fetchSeatDetails = async () => {
      const seatDetails = [];
      const initialPassengerInfo = [];

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
            initialPassengerInfo.push({ firstName: "", lastName: "" });
          } catch (error) {
            console.error("Error fetching seat details:", error);
          }
        }
      }

      setSelectedSeatDetails(seatDetails);
      setPassengerInfo(initialPassengerInfo);
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
          {passengerInfo.map((passenger, index) => (
            <div key={index}>
              <TextField
                label={`Passenger ${index + 1} First Name`}
                name={`firstName${index}`}
                value={passenger.firstName}
                onChange={(event) =>
                  handlePassengerInfoChange(index, "firstName", event.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label={`Passenger ${index + 1} Last Name`}
                name={`lastName${index}`}
                value={passenger.lastName}
                onChange={(event) =>
                  handlePassengerInfoChange(index, "lastName", event.target.value)
                }
                fullWidth
                margin="normal"
              />
            </div>
          ))}
          <TextField
            label="Cardholder First Name"
            name="cardholderFirstName"
            value={paymentInfo.cardholderFirstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cardholder Last Name"
            name="cardholderLastName"
            value={paymentInfo.cardholderLastName}
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
