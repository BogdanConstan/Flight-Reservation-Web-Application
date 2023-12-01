import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  MenuItem,
  IconButton,
  Paper,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { styled } from "@mui/material/styles";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import backgroundImage from "../pic.jpg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [locations, setLocations] = useState([]); // State for locations
  const navigate = useNavigate();
  const ticketNumbers = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/location");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error.response.data);
      }
    };

    fetchLocations();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if round trip is selected
    if (roundTrip) {
      // For round trip, both departure and return dates should be filled out
      if (!departureDate || !returnDate) {
        alert("Please fill in both departure and return dates.");
      } else if (returnDate < departureDate) {
        alert("Return date cannot be before departure date.");
      } else if (fromLocation === destination) {
        alert("From location and destination cannot be the same.");
      } else {
        // Redirect to FlightSearch for a valid round trip
        navigate("/flight-search", {
          state: { fromLocation, destination, departureDate },
        });
      }
    } else {
      // For one-way trip, only departure date is required
      if (!departureDate) {
        alert("Please fill in the departure date.");
      } else if (fromLocation === destination) {
        alert("From location and destination cannot be the same.");
      } else {
        // Redirect to FlightSearch for a valid one-way trip
        navigate("/flight-search", {
          state: { fromLocation, destination, departureDate },
        });
      }
    }
  };

  const handleSwapLocations = () => {
    // Swap the selected options for "From Location" and "Destination"
    setFromLocation(destination);
    setDestination(fromLocation);
  };

  const StyledContainer = styled(Container)(({ theme }) => ({
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    backdropFilter: "blur(8px)",
  }));

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(3, 0),
    backgroundColor: "#f5f5f5", // Light grey background
  }));

  const headlineStyle = {
    fontSize: "2.5rem", // Larger font size for headline
    fontWeight: "bold", // Bold font weight
    marginBottom: "0.5rem", // Space below the headline
    color: "#123456", // Example color, adjust as needed
  };

  const subtitleStyle = {
    fontSize: "1.5rem", // Slightly larger font size for subtitle
    fontStyle: "italic", // Italicized subtitle for emphasis
    color: "#7890AB", // Example color, adjust as needed
  };

  const BackgroundImageContainer = styled("div")({
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1, // Make sure it's behind all other content
  });

  return (
    <Box position="relative">
      <BackgroundImageContainer />
      <Header />

      <StyledContainer maxWidth="md">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <FlightTakeoffIcon style={{ fontSize: 60, color: "#123456" }} />
          </Grid>
          <Grid item>
            <Typography
              style={{ fontSize: "2.5rem", fontWeight: "bold" }}
              gutterBottom
            >
              Welcome to Our Flight Reservation Service
            </Typography>
            <Typography
              style={{ fontSize: "1.5rem", fontStyle: "italic" }}
              gutterBottom
            >
              Find and book flights with ease.
            </Typography>
          </Grid>
        </Grid>

        <StyledPaper>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={5}>
                <TextField
                  select
                  label="From Location"
                  fullWidth
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  variant="outlined"
                >
                  {locations.map((location) => (
                    <MenuItem key={location.id} value={location.city}>
                      {location.city}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={1}>
                <IconButton
                  onClick={handleSwapLocations}
                  sx={{ alignSelf: "center" }}
                >
                  <SwapHorizIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  select
                  label="Destination"
                  fullWidth
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  variant="outlined"
                >
                  {locations.map((location) => (
                    <MenuItem key={location.id} value={location.city}>
                      {location.city}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  select
                  label="Number of Tickets"
                  fullWidth
                  value={numberOfTickets}
                  onChange={(e) => setNumberOfTickets(e.target.value)}
                  variant="outlined"
                >
                  {ticketNumbers.map((number) => (
                    <MenuItem key={number} value={number}>
                      {number}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
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
              {roundTrip && ( // Conditionally render this Grid item
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="date"
                    label="Return Date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </Grid>
              )}
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
        </StyledPaper>
      </StyledContainer>

      <Footer />
    </Box>
  );
};

export default HomePage;
