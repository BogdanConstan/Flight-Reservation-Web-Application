import React from "react";
import { Container, Typography } from "@mui/material";

const PrintUsers = () => {
  // Future: Display list of registered users

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Registered Users
      </Typography>
      {/* Future: Display list of registered users here */}
    </Container>
  );
};

export default PrintUsers;
