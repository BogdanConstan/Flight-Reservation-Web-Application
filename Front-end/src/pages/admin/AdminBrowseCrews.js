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

const BrowseCrew = () => {
  const [crews, setCrews] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/crew");
        console.log(response.data);
        setCrews(response.data);
      } catch (error) {
        console.error("Error fetching crews:", error.response.data);
        // Handle error as needed
      }
    };

    fetchCrews();
  }, []);

  const goBackToDashboard = () => {
    navigate("/admin-dashboard"); // Use navigate to go back to the dashboard
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Browse Crews
      </Typography>

      {/* Flights Table */}
      <TableContainer component={Paper}>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: "center" }}>Crew ID</TableCell>
            <TableCell style={{ textAlign: "center" }}>Assigned</TableCell>
            <TableCell style={{ textAlign: "center" }}>Number of Crew Members</TableCell>
            <TableCell style={{ textAlign: "center" }}>FlightID</TableCell>
            {/* Add more columns for other aircraft details */}
          </TableRow>
        </TableHead>
        <TableBody>
          {crews.map((crew) => (
            <TableRow key={crew.id}>
              <TableCell style={{ textAlign: "center" }}>{crew.id}</TableCell>
              <TableCell style={{ textAlign: "center" }}>{crew.assigned}</TableCell>
              <TableCell style={{ textAlign: "center" }}>{crew.numCrewMembers}</TableCell>
              <TableCell style={{ textAlign: "center" }}>{crew.flightid}</TableCell>
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

export default BrowseCrew;
