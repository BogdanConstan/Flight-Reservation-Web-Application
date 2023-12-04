import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const FlightSearch = () => {
  const location = useLocation();
  const { fromLocation, destination, departureDate } = location.state || {};
  console.log(fromLocation, destination, departureDate);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/flight/search`,
          {
            params: {
              origin: fromLocation,
              destination: destination,
              departureDate: departureDate,
            },
          }
        );
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error.response.data);
      }
    };

    if (fromLocation && destination && departureDate) {
      fetchFlights();
    }
  }, [fromLocation, destination, departureDate]);

  const navigate = useNavigate();

  const handleFlightClick = (flightId) => {
    navigate(`/flight-details/${flightId}`);
  };

  return (
    <div>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Flights
        </Typography>
        <List>
          {flights.map((flight) => (
            <ListItem
              key={flight.id}
              button
              onClick={() => handleFlightClick(flight.id)}
            >
              <ListItemText
                primary={`${flight.origin} to ${flight.destination}`}
                secondary={`Date: ${flight.departureDate}, Price: ${flight.price}`}
              />
            </ListItem>
          ))}
        </List>
      </Container>
      <Footer />
    </div>
  );
};

export default FlightSearch;
