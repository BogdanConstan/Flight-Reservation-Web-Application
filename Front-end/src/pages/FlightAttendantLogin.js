import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const FlightAttendantLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFlightAttendantLogin = (event) => {
    event.preventDefault();
    // Check if the credentials match the specified ones
    if (username === "flightattendant" && password === "password") {
      // Redirect to the FlightAttendantDashboard page
      navigate("/flight-attendant-dashboard");
    } else {
      alert("Invalid credentials"); // Handle invalid credentials
    }
  };

  return (
    <Box>
      <Header />

      <Container maxWidth="sm" sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Flight Attendant Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleFlightAttendantLogin}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                fullWidth
                autoFocus
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                fullWidth
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Flight Attendant Login
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default FlightAttendantLoginPage;
