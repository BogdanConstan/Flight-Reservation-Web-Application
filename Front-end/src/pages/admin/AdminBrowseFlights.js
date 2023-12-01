import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import axios from "axios";

const BrowseFlights = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:8080/flight");
        console.log(response.data);
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error.response.data);
        // Handle error as needed
      }
    };

    fetchFlights();
  }, []);

  const goBackToDashboard = () => {
    navigate("/admin-dashboard"); // Use navigate to go back to the dashboard
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Browse Flights
      </Typography>

      {/* Flights Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flight ID</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Departure Date</TableCell>
              {/* Add more columns for other aircraft details */}
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.id}</TableCell>
                <TableCell>{flight.origin}</TableCell>
                <TableCell>{flight.destination}</TableCell>
                <TableCell>{flight.departureDate}</TableCell>
                {/* Add more cells for other aircraft details */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Back to Dashboard Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={goBackToDashboard}
        sx={{ mt: 3 }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default BrowseFlights;
