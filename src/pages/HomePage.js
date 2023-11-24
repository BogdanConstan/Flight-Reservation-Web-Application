import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
  // State hooks for form inputs
  const [fromLocation, setFromLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState(1);

  // Example options for dropdowns (replace with actual data)
  const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];
  const ticketNumbers = [1, 2, 3, 4, 5];

  return (
    <Box>
      <Header />

      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Our Flight Reservation Service
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Find and book flights with ease.
        </Typography>

        {/* Flight Search Form */}
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="From Location"
                fullWidth
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                SelectProps={{ native: true }}
                variant="outlined" // Ensures the text field is outlined
                InputLabelProps={{
                  shrink: true, // This ensures the label shrinks when an item is selected
                }}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Choose Destination"
                fullWidth
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                SelectProps={{ native: true }}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={roundTrip}
                    onChange={(e) => setRoundTrip(e.target.checked)}
                  />
                }
                label="Roundtrip"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Departure Date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Arrival Date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Number of Tickets"
                fullWidth
                value={numberOfTickets}
                onChange={(e) => setNumberOfTickets(e.target.value)}
                SelectProps={{ native: true }}
              >
                {ticketNumbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Search Flights
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default HomePage;
