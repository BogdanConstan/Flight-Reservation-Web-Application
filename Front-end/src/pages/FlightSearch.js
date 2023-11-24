import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FlightSearch = () => {
  // Example flights data (replace with real data later)
  const flights = [
    {
      id: 1,
      from: "New York",
      to: "Los Angeles",
      date: "2023-12-01",
      price: "$300",
    },
    { id: 2, from: "Chicago", to: "Miami", date: "2023-12-05", price: "$250" },
    // ... more example flights
  ];

  return (
    <div>
      <Header />
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Flights
        </Typography>
        <List>
          {flights.map((flight) => (
            <ListItem key={flight.id}>
              <ListItemText
                primary={`${flight.from} to ${flight.to}`}
                secondary={`Date: ${flight.date}, Price: ${flight.price}`}
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
