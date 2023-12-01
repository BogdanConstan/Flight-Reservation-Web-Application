import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageFlights = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [locations, setLocations] = useState([]);
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const [departureDate, setDepartureDate] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/location");
        setLocations(response.data);
        console.log("Fetched locations:", response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        // Handle error as needed
      }
    };

    fetchLocations();
    fetchFlights(); // Fetch flights on initial load
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:8080/flight");
      setFlights(response.data);
      console.log("Fetched flights:", response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
      // Handle error as needed
    }
  };

  const handleAddFlight = async () => {
    try {
      if (!origin.city || !destination.city || !departureDate) {
        alert("Please select origin, destination, and departure date.");
        return;
      }

      const formattedDate = new Date(departureDate).toISOString().split("T")[0];

      const newFlight = {
        origin: origin.city,
        destination: destination.city,
        departureDate: formattedDate,
        // Add other necessary fields for the new flight
      };

      await axios.post("http://localhost:8080/flight", newFlight);
      fetchFlights(); // Fetch updated flights after adding a new one

      // Clear input fields after adding the flight
      setOrigin({});
      setDestination({});
      setDepartureDate("");
    } catch (error) {
      console.error("Error adding flight:", error);
      // Handle error as needed
    }
  };

  const handleRemoveFlight = async (flightId) => {
    try {
      await axios.delete(`http://localhost:8080/flight/${flightId}`);
      fetchFlights(); // Fetch updated flights after deleting one
    } catch (error) {
      console.error("Error removing flight:", error);
      // Handle error as needed
    }
  };

  const handleBackToDashboard = () => {
    navigate("/admin-dashboard");
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Manage Flights
      </Typography>

      <Box sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 200, mr: 2 }}>
          <InputLabel>Origin</InputLabel>
          <Select
            value={origin.city || ""}
            onChange={(e) => {
              const selectedLocation = locations.find(
                (loc) => loc.city === e.target.value
              );
              setOrigin(selectedLocation || {});
            }}
          >
            {locations.map((location, index) => (
              <MenuItem key={index} value={location.city}>
                {location.city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200, mr: 2 }}>
          <InputLabel>Destination</InputLabel>
          <Select
            value={destination.city || ""}
            onChange={(e) => {
              const selectedLocation = locations.find(
                (loc) => loc.city === e.target.value
              );
              setDestination(selectedLocation || {});
            }}
          >
            {locations.map((location, index) => (
              <MenuItem key={index} value={location.city}>
                {location.city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <Button variant="contained" onClick={handleAddFlight}>
          Add Flight
        </Button>
      </Box>

      {/* Table to display flights */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Departure Date</TableCell>
              <TableCell>Actions</TableCell>{" "}
              {/* New table header for actions */}
              {/* Add other table headers */}
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.origin}</TableCell>
                <TableCell>{flight.destination}</TableCell>
                <TableCell>{flight.departureDate}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveFlight(flight.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
                {/* Add other table cells */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={handleBackToDashboard}
        sx={{ mt: 3 }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default ManageFlights;
