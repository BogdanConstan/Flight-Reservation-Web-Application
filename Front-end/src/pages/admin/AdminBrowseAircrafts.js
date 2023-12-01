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

const BrowseAircrafts = () => {
  const [aircrafts, setAircrafts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchAircrafts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/aircraft");
        console.log(response.data);
        setAircrafts(response.data);
      } catch (error) {
        console.error("Error fetching aircrafts:", error.response.data);
        // Handle error as needed
      }
    };

    fetchAircrafts();
  }, []);

  const goBackToDashboard = () => {
    navigate("/admin-dashboard"); // Use navigate to go back to the dashboard
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Browse Aircrafts
      </Typography>

      {/* Aircrafts Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Aircraft ID</TableCell>
              <TableCell>Assigned</TableCell>
              <TableCell>Number of Rows</TableCell>
              <TableCell>Number of Columns</TableCell>
              {/* Add more columns for other aircraft details */}
            </TableRow>
          </TableHead>
          <TableBody>
            {aircrafts.map((aircraft) => (
              <TableRow key={aircraft.id}>
                <TableCell>{aircraft.id}</TableCell>
                <TableCell>{aircraft.assigned ? "Yes" : "No"}</TableCell>
                <TableCell>{aircraft.numRows}</TableCell>
                <TableCell>{aircraft.numCols}</TableCell>
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

export default BrowseAircrafts;
