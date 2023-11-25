import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminManageDestinations = () => {
  const navigate = useNavigate();
  const [arrivalLocations, setArrivalLocations] = useState([
    "New York",
    "London",
    "Tokyo",
  ]); // Placeholder for arrival locations
  const [destinationLocations, setDestinationLocations] = useState([
    "Paris",
    "Sydney",
    "Dubai",
  ]); // Placeholder for destination locations
  const [newLocation, setNewLocation] = useState("");
  const [locationType, setLocationType] = useState("arrival"); // Can be 'arrival' or 'destination'

  const handleRemoveLocation = (location, type) => {
    console.log(`Remove ${type} location: ${location}`);
    // Logic for removing a location
    if (type === "arrival") {
      setArrivalLocations(arrivalLocations.filter((loc) => loc !== location));
    } else {
      setDestinationLocations(
        destinationLocations.filter((loc) => loc !== location)
      );
    }
  };

  const handleAddLocation = () => {
    console.log(`Add ${locationType} location: ${newLocation}`);
    // Logic for adding a location
    if (locationType === "arrival" && newLocation) {
      setArrivalLocations([...arrivalLocations, newLocation]);
    } else if (locationType === "destination" && newLocation) {
      setDestinationLocations([...destinationLocations, newLocation]);
    }
    setNewLocation("");
  };

  const goBackToDashboard = () => {
    navigate("/admin-dashboard");
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Manage Destinations
      </Typography>

      {/* Arrival Locations */}
      <Typography variant="h6">Arrival Locations</Typography>
      <List>
        {arrivalLocations.map((location, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <Button
                color="secondary"
                onClick={() => handleRemoveLocation(location, "arrival")}
              >
                Remove
              </Button>
            }
          >
            <ListItemText primary={location} />
          </ListItem>
        ))}
      </List>

      {/* Destination Locations */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Destination Locations
      </Typography>
      <List>
        {destinationLocations.map((location, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <Button
                color="secondary"
                onClick={() => handleRemoveLocation(location, "destination")}
              >
                Remove
              </Button>
            }
          >
            <ListItemText primary={location} />
          </ListItem>
        ))}
      </List>

      {/* Add Location */}
      <Box sx={{ mt: 4 }}>
        <TextField
          select
          label="Location Type"
          value={locationType}
          onChange={(e) => setLocationType(e.target.value)}
          sx={{ width: 150, mr: 2 }}
        >
          <option value="arrival">Arrival</option>
          <option value="destination">Destination</option>
        </TextField>
        <TextField
          label="New Location"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleAddLocation}>
          Add Location
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

export default AdminManageDestinations;
