import React from "react";
import { Container, Typography } from "@mui/material";

const BrowseFlights = () => {
  // Future: Fetch and display flights data here

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Browse Flights
      </Typography>
      {/* Future: Display list of flights here */}
    </Container>
  );
};

export default BrowseFlights;
