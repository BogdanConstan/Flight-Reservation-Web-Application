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

      const formattedDate = new Date(departureDate).toISOString().split('T')[0];

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
          <Select value={origin.city || ''} onChange={(e) => {
            const selectedLocation = locations.find(loc => loc.city === e.target.value);
            setOrigin(selectedLocation || {});
          }}>
            {locations.map((location, index) => (
              <MenuItem key={index} value={location.city}>
                {location.city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200, mr: 2 }}>
          <InputLabel>Destination</InputLabel>
          <Select value={destination.city || ''} onChange={(e) => {
            const selectedLocation = locations.find(loc => loc.city === e.target.value);
            setDestination(selectedLocation || {});
          }}>
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
              <TableCell>Actions</TableCell> {/* New table header for actions */}
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








/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const ManageFlights = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [flightData, setFlightData] = useState({
    departureLocation: "",
    arrivalLocation: "",
    departureDate: "", // Separate fields for date and time
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    aircraft: "",
  });

  // Placeholder data for the dropdowns
  const locations = ["New York", "London", "Tokyo", "Paris", "Sydney"];
  const aircrafts = ["Boeing 777", "Airbus A380", "Boeing 737", "Airbus A320"];

  const handleSearch = () => {
    // API call to search flight by searchTerm
    // Mock response for demonstration
    setFlightData({
      departureLocation: locations[0],
      arrivalLocation: locations[1],
      departureDate: "2023-01-01",
      departureTime: "10:00",
      arrivalDate: "2023-01-01",
      arrivalTime: "14:00",
      aircraft: aircrafts[0],
    });
  };

  const handleChange = (prop) => (event) => {
    setFlightData({ ...flightData, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // API call to update the flight data
    console.log("Updated Flight Data:", flightData);
  };

  const handleBackToDashboard = () => {
    navigate("/admin-dashboard"); // Replace with your actual dashboard route
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Manage Flights
      </Typography>

      {/* Search Component *//*}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <TextField
          label="Flight Number"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Display and Modify Flight Information *//*}
      <form onSubmit={handleSubmit}>
        <List>
          {["departureLocation", "arrivalLocation", "aircraft"].map((key) => (
            <ListItem key={key}>
              <ListItemText
                primary={
                  key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")
                }
              />
              <FormControl sx={{ ml: 2, flex: 1 }}>
                <InputLabel>{key}</InputLabel>
                <Select value={flightData[key]} onChange={handleChange(key)}>
                  {key === "aircraft"
                    ? aircrafts.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))
                    : locations.map((location, index) => (
                        <MenuItem key={index} value={location}>
                          {location}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </ListItem>
          ))}
          {["departureDate", "departureTime", "arrivalDate", "arrivalTime"].map(
            (key) => (
              <ListItem key={key}>
                <ListItemText
                  primary={
                    key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")
                  }
                />
                <TextField
                  type={key.includes("Date") ? "date" : "time"}
                  value={flightData[key]}
                  onChange={handleChange(key)}
                  sx={{ ml: 2, flex: 1 }}
                  InputLabelProps={{ shrink: true }}
                />
              </ListItem>
            )
          )}
        </List>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Update Flight
        </Button>
      </form>

      {/* Back to Dashboard Button *//*}
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

export default ManageFlights;*/
