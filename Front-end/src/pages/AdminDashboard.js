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
    navigate("/admin/browse-flights");
  };

  const browseCrews = (flightNumber) => {
    navigate("/admin/browse-crews"); // Pass flightNumber as needed
  };

  const browseAircrafts = () => {
    navigate("/admin/browse-aircrafts");
  };

  const addOrRemoveCrew = () => {
    navigate("/admin/manage-crew");
  };

  const addOrRemoveAircraft = () => {
    navigate("/admin/manage-aircraft");
  };

  const addOrRemoveDestination = () => {
    navigate("/admin/manage-destinations");
  };

  const manageFlights = () => {
    navigate("/admin/manage-flights");
  };

  const printRegisteredUsers = () => {
    navigate("/admin/print-users");
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Admin Dashboard
      </Typography>

      {/* Browse Flights */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Browse Flights</Typography>
        <Button onClick={browseFlights}>Browse Flights</Button>
        {/* Future: Display list of flights here */}
      </Paper>

      {/* Browse Crews */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Browse Crews for a Flight</Typography>
        <TextField label="Flight Number" />
        <Button onClick={() => browseCrews("AB123")}>Browse Crews</Button>
        {/* Future: Display list of crews here */}
      </Paper>

      {/* Browse Aircrafts */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Browse Aircrafts</Typography>
        <Button onClick={browseAircrafts}>Browse Aircrafts</Button>
        {/* Future: Display list of aircrafts here */}
      </Paper>

      {/* Add/Remove Crew */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Manage Crew</Typography>
        <Button onClick={addOrRemoveCrew}>Add/Remove Crew</Button>
        {/* Future: Form for adding/removing crew */}
      </Paper>

      {/* Add/Remove Aircraft */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Manage Aircraft</Typography>
        <Button onClick={addOrRemoveAircraft}>Add/Remove Aircraft</Button>
        {/* Future: Form for adding/removing aircraft */}
      </Paper>

      {/* Add/Remove Flight Destinations */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Manage Flight Destinations</Typography>
        <Button onClick={addOrRemoveDestination}>
          Add/Remove Destinations
        </Button>
        {/* Future: Form for adding/removing destinations */}
      </Paper>

      {/* Manage Flights */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Manage Flights Information</Typography>
        <Button onClick={manageFlights}>Manage Flights</Button>
        {/* Future: Form for managing flights */}
      </Paper>

      {/* Print Registered Users */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Registered Users</Typography>
        <Button onClick={printRegisteredUsers}>Print Users</Button>
        {/* Future: Display list of registered users */}
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
