import React, { useState, useEffect } from "react";
import axios from 'axios'
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminManageDestinations = () => {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [newLocationCity, setNewLocationCity] = useState("");
  const [newLocationProvince, setNewLocationProvince] = useState("");
  const [newLocationCountry, setNewLocationCountry] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/location");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error.response.data);
        // Handle error as needed
      }
    };

    fetchLocations();
  }, []);

  const handleRemoveLocation = async (location) => {
    try {
      await axios.delete(`http://localhost:8080/location/${location.id}`);
      setLocations(locations.filter((loc) => loc.id !== location.id));
    } catch (error) {
      console.error("Error removing location:", error.response.data);
      // Handle error as needed
    }
  };
  
  const handleAddLocation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/location",
        {
          name: "",
          city: newLocationCity,
          province_state: newLocationProvince,
          country: newLocationCountry,
        }
      );

      setLocations([...locations, response.data.location]);
      setNewLocationCity("");
      setNewLocationProvince("");
      setNewLocationCountry("");
    } catch (error) {
      console.error("Error adding location:", error.response.data);
      // Handle error as needed
    }
  };

  const goBackToDashboard = () => {
    navigate("/admin-dashboard");
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Manage Destinations
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Location ID</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Province/State</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location.id}>
                <TableCell>{location.id}</TableCell>
                <TableCell>{location.city}</TableCell>
                <TableCell>{location.province_state}</TableCell>
                <TableCell>{location.country}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => handleRemoveLocation(location)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4 }}>
        <TextField
          label="City"
          value={newLocationCity}
          onChange={(e) => setNewLocationCity(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Province/State"
          value={newLocationProvince}
          onChange={(e) => setNewLocationProvince(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Country"
          value={newLocationCountry}
          onChange={(e) => setNewLocationCountry(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleAddLocation}>
          Add Location
        </Button>
      </Box>

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




/*import React, { useState, useEffect } from "react";
import axios from 'axios'
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

  // State for existing locations.
  const [locations, setLocations] = useState([

  ]); // Placeholder for arrival locations

  // State for new location input fields.
  const [newLocationCity, setNewLocationCity] = useState("");
  const [newLocationProvince, setNewLocationProvince] = useState("");
  const [newLocationCountry, setNewLocationCountry] = useState("");

    // Fetch existing locations from the backend on component mount
    useEffect(() => {
      const fetchLocations = async () => {
        try {
          const response = await axios.get('http://localhost:8080/location');
          if (response.status === 200) {
            // If successful, update the state with existing locations
            const existingLocations = response.data.map(location => {
              const { city, provinceState, country } = location;
              return `${city}, ${provinceState}, ${country}`;
            });
            setLocations(existingLocations);
          } else {
            // Log an error if the request is not successful
            console.error('Error fetching locations:', response.statusText);
          }
        } catch (error) {
          // Log an error if there is an exception during the request
          console.error('Error fetching locations:', error.message);
        }
      };
  
      fetchLocations();
    }, []); // The empty dependency array ensures that this effect runs only once on component mount
  
  
    // Function to handle the removal of a location
    const handleRemoveLocation = async (location) => {
      try {
        const response = await axios.get('http://localhost:8080/location');
        if (response.status === 200) {
          // If successful, update the state with existing locations
          const existingLocations = response.data.locations.map(location => {
            const { city, province_state, country } = location;
            return `${city}, ${province_state}, ${country}`;
          });
          setLocations(existingLocations);
        } else {
          // Log an error if the request is not successful
          console.error('Error fetching locations:', response.statusText);
        }
      } catch (error) {
        // Log an error if there is an exception during the request
        console.error('Error fetching locations:', error.message);
      }
    };

    fetchLocations();
  }, []); // The empty dependency array ensures that this effect runs only once on component mount


  // Function to handle the removal of a location
  const handleRemoveLocation = async (location) => {
    try {
      // Extract city, province_state, and country from the location string
      const [city, province_state, country] = location.split(', ');

      // Make a DELETE request to the backend to remove the location
      const response = await axios.delete('http://localhost:8080/location', {
        params: { city, province_state, country }, // Pass parameters in the params object
      });

      if (response.status === 200) {
        // If successful, update the state by filtering out the removed location
        setLocations(locations.filter((loc) => loc !== location));
      } else {
        // Log an error if the request is not successful
        console.error('Error removing location:', response.statusText);
      }
    } catch (error) {
      // Log an error if there is an exception during the request
      console.error('Error removing location:', error.message);
    }
  };

  // Function to handle the addition of a new location
  const handleAddLocation = async () => {
    try {
      // Make a POST request to the backend to add a new location
      const response = await axios.post('http://localhost:8080/location', {
        city: newLocationCity,
        province_state: newLocationProvince,
        country: newLocationCountry,
      });

      if (response.status === 201) {
        // If successful, extract relevant properties from the saved location
        const savedLocation = response.data.location;
        const { city, province_state, country } = savedLocation;

        // Update the state with the new location
        setLocations([...locations, `${city}, ${province_state}, ${country}`]);

        // Reset the input fields
        setNewLocationCity('');
        setNewLocationProvince('');
        setNewLocationCountry('');
      } else {
        // Log an error if the request is not successful
        console.error('Error adding location:', response.statusText);
      }
    } catch (error) {
      // Log an error if there is an exception during the request
      console.error('Error adding location:', error.message);
    }
  };

  // Function to navigate back to the dashboard.
  const goBackToDashboard = () => {
    navigate("/admin-dashboard");
  };

  // Render the component
  return (
    <Container maxWidth="lg">
      {/* Title *//*}
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Manage Destinations
      </Typography>

      {/* Locations List *//*}
      <List>
        {locations.map((location, index) => (
          // Render each location with a remove button
          <ListItem
            key={index}
            secondaryAction={
              <Button
                color="secondary"
                onClick={() => handleRemoveLocation(location)}
              >
                Remove
              </Button>
            }
          >
            <ListItemText primary={location} />
          </ListItem>
        ))}
      </List>

      {/* Add Location Form *//*}
      <Box sx={{ mt: 4 }}>
        <TextField
          label="City"
          value={newLocationCity}
          onChange={(e) => setNewLocationCity(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Province/State"
          value={newLocationProvince}
          onChange={(e) => setNewLocationProvince(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Country"
          value={newLocationCountry}
          onChange={(e) => setNewLocationCountry(e.target.value)}
          sx={{ mr: 2 }}
        />
        {/* Button to add a new location *//*}
        <Button variant="contained" onClick={handleAddLocation}>
          Add Location
        </Button>
      </Box>

      {/* Back to Dashboard Button *//*}
      {/* Button to navigate back to the dashboard *//*}
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

export default AdminManageDestinations;*/
