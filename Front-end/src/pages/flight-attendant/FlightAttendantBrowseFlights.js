import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FlightAttendantDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:8080/flight");
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error.response.data);
      }
    };

    fetchFlights();
  }, []);

  const viewPassengers = async (flightId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/flight/${flightId}/passengers`
      );
      setPassengers(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching passengers:", error.response.data);
    }
  };

  const goBackToDashboard = () => {
    navigate("/flight-attendant-dashboard");
  };

  // Styles for modal
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Browse Flights and View Passengers
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Browse Flights</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Flight ID</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Departure Date</TableCell>
                <TableCell>Actions</TableCell> {/* Header for actions */}
              </TableRow>
            </TableHead>
            <TableBody>
              {flights.map((flight) => (
                <TableRow key={flight.id}>
                  <TableCell>{flight.id}</TableCell>
                  <TableCell>{flight.origin}</TableCell>
                  <TableCell>{flight.destination}</TableCell>
                  <TableCell>{flight.departureDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => viewPassengers(flight.id)}
                    >
                      View Passengers
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          color="primary"
          onClick={goBackToDashboard}
          sx={{ mt: 3 }}
        >
          Back to Dashboard
        </Button>
      </Paper>
      {/* Modal for showing passengers */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Passenger List</Typography>
          <List>
            {passengers.map((passenger, index) => (
              <ListItem key={index}>
                {/* Adjust the following line according to your passenger data structure */}
                <ListItemText
                  primary={`${passenger.firstName} ${passenger.lastName}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </Container>
  );
};

export default FlightAttendantDashboard;
