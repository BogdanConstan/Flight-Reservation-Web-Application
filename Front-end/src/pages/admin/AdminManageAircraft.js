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

const AdminManageAircraft = () => {
  const navigate = useNavigate();
  const [aircrafts, setAircrafts] = useState([
    "Boeing 737",
    "Airbus A320",
    "Embraer E190",
  ]); // Placeholder aircraft data
  const [newAircraft, setNewAircraft] = useState("");

  const handleRemoveAircraft = (aircraft) => {
    console.log(`Remove aircraft: ${aircraft}`);
    // Placeholder logic for removing an aircraft
    // Replace this with actual backend integration
    setAircrafts(aircrafts.filter((ac) => ac !== aircraft));
  };

  const handleAddAircraft = () => {
    console.log(`Add aircraft: ${newAircraft}`);
    // Placeholder logic for adding an aircraft
    // Replace this with actual backend integration
    if (newAircraft) {
      setAircrafts([...aircrafts, newAircraft]);
      setNewAircraft("");
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

      {/* List of Aircrafts */}
      <List>
        {aircrafts.map((aircraft, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <Button
                color="secondary"
                onClick={() => handleRemoveAircraft(aircraft)}
              >
                Remove
              </Button>
            }
          >
            <ListItemText primary={aircraft} />
          </ListItem>
        ))}
      </List>

      {/* Add Aircraft */}
      <Box sx={{ mt: 4 }}>
        <TextField
          label="New Aircraft Model"
          value={newAircraft}
          onChange={(e) => setNewAircraft(e.target.value)}
          sx={{ mr: 2 }}
        />
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
