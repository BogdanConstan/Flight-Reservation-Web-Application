import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Paper, Button } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FlightDetails = () => {
  const { flightId } = useParams();

  const firstClassSeats = ["1A", "1B", "1C", "1D"];
  const businessClassSeats = ["2A", "2B", "2C", "2D"];
  const economyClassSeats = Array.from(
    { length: 36 },
    (_, i) => `${Math.floor(i / 6) + 3}${String.fromCharCode(65 + (i % 6))}`
  ); // Generates seat IDs like 3A, 3B, ... up to 8F

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [takenSeats, setTakenSeats] = useState(["1A", "2B", "3C"]); // Presumably, this would be fetched from a backend

  const toggleSeatSelection = (seat) => {
    if (takenSeats.includes(seat)) {
      // Ignore if seat is taken
      return;
    }
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seat)
        ? prevSelected.filter((s) => s !== seat)
        : [...prevSelected, seat]
    );
  };

  const getSeatColor = (seat) => {
    if (takenSeats.includes(seat)) return "secondary"; // Red color for taken seats
    if (selectedSeats.includes(seat)) return "success"; // Green color for selected seats
    return "primary"; // Default color for available seats
  };

  const renderSeats = (seats, isEconomy = false) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isEconomy ? "repeat(6, 1fr)" : "repeat(4, 1fr)",
        columnGap: "10px",
        rowGap: "10px",
        maxWidth: isEconomy ? "330px" : "220px", // Adjust the width for economy/business class
        margin: "auto",
      }}
    >
      {seats.map((seat, index) => {
        // Insert a visual gap for the aisle after every third seat
        const isAisle = isEconomy && index % 3 === 0 && index !== 0;
        return (
          <React.Fragment key={seat}>
            {isAisle && <div style={{ gridColumn: "span 1" }} />}{" "}
            {/* Empty grid item for the aisle */}
            <Button
              variant={
                getSeatColor(seat) === "primary" ? "outlined" : "contained"
              }
              color={getSeatColor(seat)}
              onClick={() => toggleSeatSelection(seat)}
              disabled={takenSeats.includes(seat)}
              style={{ width: "48px", height: "48px" }}
            >
              {seat}
            </Button>
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div>
      <Header />
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Flight Details - Flight {flightId}
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">First Class</Typography>
          {renderSeats(firstClassSeats)}
          <Typography variant="h6">Business Class</Typography>
          {renderSeats(businessClassSeats)}
          <Typography variant="h6">Economy Class</Typography>
          {renderSeats(economyClassSeats, true)}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={selectedSeats.length === 0}
            onClick={() =>
              console.log("Proceed to payment with seats:", selectedSeats)
            }
          >
            Proceed to Payment
          </Button>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default FlightDetails;
