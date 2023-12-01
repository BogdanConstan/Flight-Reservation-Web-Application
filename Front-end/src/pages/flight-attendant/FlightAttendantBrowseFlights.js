import React from "react";
import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FlightAttendantDashboard = () => {
  const navigate = useNavigate();

  const browseFlights = () => {
    navigate("/flight-attendant/browse-flights");
  };

  const viewPassengers = (flightId) => {
    // This function can be modified to take a specific flight ID
    // and navigate to a page showing passengers for that flight
    navigate(`/flight-attendant/view-passengers/${flightId}`);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Flight Attendant Dashboard
      </Typography>

      {/* Browse Flights */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Browse Flights</Typography>
        <Button onClick={browseFlights}>Browse Flights</Button>
        {/* Future: Display list of flights here */}
      </Paper>

      {/* View Passengers on a Flight */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">View Passengers</Typography>
        <Button onClick={() => viewPassengers("FL123")}>View Passengers</Button>
        {/* Future: Display list of passengers here */}
        {/* The flight ID can be dynamic based on the selected flight */}
      </Paper>

      {/* Additional functionalities specific to flight attendants can be added here */}
    </Container>
  );
};

export default FlightAttendantDashboard;
