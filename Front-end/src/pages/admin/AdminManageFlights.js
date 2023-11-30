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
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageFlights = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [locations, setLocations] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/location");
        const formattedLocations = response.data.map((location) => ({
          city: location.city,
          provinceState: location.provinceState,
          country: location.country,
        }));
        setLocations(formattedLocations);
        console.log("Fetched locations:", formattedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
        // Handle error as needed
      }
    };

    fetchLocations();
  }, []);

  const handleAddFlight = async () => {
    try {
      if (!origin || !destination || !departureDate) {
        alert("Please select origin, destination, and departure date.");
        return;
      }
  
      // Find the selected locations by filtering the locations array
      const selectedOrigin = locations.find(loc => loc.city === origin);
      const selectedDestination = locations.find(loc => loc.city === destination);
      const formattedDate = new Date(departureDate).toISOString().split('T')[0];
  
      if (!selectedOrigin || !selectedDestination) {
        alert("Invalid origin or destination selected.");
        return;
      }
  
      const newFlight = {
        origin: origin,
        destination: destination,
        departureDate: formattedDate,
        // Add other necessary fields for the new flight
      };

      await axios.post("http://localhost:8080/flight", newFlight);

      // Optionally, you might want to fetch updated flights after adding a new one
      const response = await axios.get("http://localhost:8080/flights");
      setFlights(response.data);

      // Clear input fields after adding the flight
      setOrigin("");
      setDestination("");
      setDepartureDate("");

      // Optionally, you might want to display a success message or update the UI
    } catch (error) {
      console.error("Error adding flight:", error);
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
          <Select value={origin} onChange={(e) => setOrigin(e.target.value)}>
            {locations.map((location, index) => (
              <MenuItem key={index} value={location.city}>
                {`${location.city}, ${location.provinceState}, ${location.country}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200, mr: 2 }}>
          <InputLabel>Destination</InputLabel>
          <Select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            {locations.map((location, index) => (
              <MenuItem key={index} value={location.city}>
                {`${location.city}, ${location.provinceState}, ${location.country}`}
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
      {/* Code for displaying flights in a table */}

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
