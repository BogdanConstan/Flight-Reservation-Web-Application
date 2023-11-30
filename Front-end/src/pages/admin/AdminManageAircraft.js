import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  //TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminManageAircraft = () => {
  const navigate = useNavigate();
  const [aircrafts, setAircrafts] = useState([]);
  const [newAircraft, setNewAircraft] = useState({
    name: "",
    numRows: 0,
    numCols: 0,
  });

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

  const handleRemoveAircraft = async (aircraft) => {
    try {
      await axios.delete(`http://localhost:8080/aircraft/${aircraft.id}`);
      setAircrafts(aircrafts.filter((ac) => ac.id !== aircraft.id));
    } catch (error) {
      console.error("Error removing aircraft:", error.response.data);
      // Handle error as needed
    }
  };

  const handleAddAircraft = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/aircraft",
        newAircraft
      );
      setAircrafts([...aircrafts, response.data.aircraft]);
      setNewAircraft({
        name: "",
        numRows: 0,
        numCols: 0,
      });
    } catch (error) {
      console.error("Error adding aircraft:", error.response.data);
      // Handle error as needed
    }
  };

  const goBackToDashboard = () => {
    navigate("/admin-dashboard");
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Manage Aircraft
      </Typography>

      {/* Aircraft Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Aircraft ID</TableCell>
              <TableCell>Assigned</TableCell>
              <TableCell>Number of Rows</TableCell>
              <TableCell>Number of Columns</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aircrafts.map((aircraft) => (
              <TableRow key={aircraft.id}>
                <TableCell>{aircraft.id}</TableCell>
                <TableCell>{aircraft.assigned ? "Yes" : "No"}</TableCell>
                <TableCell>{aircraft.numRows}</TableCell>
                <TableCell>{aircraft.numCols}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => handleRemoveAircraft(aircraft)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Aircraft Form */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Add New Aircraft</Typography>
        {/* ... (existing form fields) */}
        <Button variant="contained" onClick={handleAddAircraft}>
          Add Aircraft
        </Button>
      </Box>

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

export default AdminManageAircraft;