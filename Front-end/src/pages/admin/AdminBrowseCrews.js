import React from "react";
import { Container, Typography } from "@mui/material";

const BrowseCrews = () => {
  // Future: Fetch and display crews data here

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Browse Crews
      </Typography>
      {/* Future: Display list of crews here */}
    </Container>
  );
};

export default BrowseCrews;
