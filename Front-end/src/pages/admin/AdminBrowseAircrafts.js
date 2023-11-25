import React from "react";
import { Container, Typography } from "@mui/material";

const BrowseAircrafts = () => {
  // Future: Fetch and display aircrafts data here

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Browse Aircrafts
      </Typography>
      {/* Future: Display list of aircrafts here */}
    </Container>
  );
};

export default BrowseAircrafts;
