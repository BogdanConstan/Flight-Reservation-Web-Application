import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const browseFlights = () => {
    navigate("/flight-attendant/browse-flights");
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
    </Container>
  );
};

export default AdminDashboard;
