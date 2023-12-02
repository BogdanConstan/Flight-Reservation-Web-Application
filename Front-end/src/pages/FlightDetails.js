import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Paper, Button } from "@mui/material";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const FlightDetails = () => {
  const { flightId } = useParams();
  const [aircraftId, setAircraftId] = useState(null);
  const [seatMap, setSeatMap] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [takenSeats, setTakenSeats] = useState([]); // Added state for taken seats

  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate("/payment", { state: { flightId, aircraftId, selectedSeats } });
  };

  const handleSeatClick = (seat) => {
    if (seat && !takenSeats.includes(seat)) {
      // Check if the seat is not taken
      const isAlreadySelected = selectedSeats.includes(seat);
      setSelectedSeats(
        isAlreadySelected
          ? selectedSeats.filter((s) => s !== seat)
          : [...selectedSeats, seat]
      );
    }
  };

  useEffect(() => {
    const fetchAircraftId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/aircraftId/${flightId}`
        );
        setAircraftId(response.data);
      } catch (error) {
        console.error("Error fetching aircraft:", error);
      }
    };

    fetchAircraftId();
  }, [flightId]);

  useEffect(() => {
    const fetchSeats = async () => {
      if (aircraftId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/seats/${aircraftId}`
          );
          setSeatMap(response.data);
          const takenSeatsArray = response.data
            .filter((seat) => !seat.availability) // Assuming 'availability' indicates if a seat is taken
            .map((seat) => `${seat.rowNum}${seat.colChar}`);
          setTakenSeats(takenSeatsArray);
        } catch (error) {
          console.error("Error fetching seats:", error);
        }
      }
    };

    fetchSeats();
  }, [aircraftId]);

  const generateSeatRows = () => {
    const rows = [];
    const alphabet = "ABCDEF"; // Update as needed

    for (let i = 1; i <= 20; i++) {
      const row = [];
      for (let j = 0; j < 6; j++) {
        row.push(`${i}${alphabet[j]}`);
        if (j === 2) {
          row.push(null); // Separation
        }
      }
      rows.push(row);
    }
    return rows;
  };

  const seatRows = generateSeatRows();

  return (
    <div>
      <Header />
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Flight Details - Flight {flightId}
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Aircraft ID: {aircraftId}</Typography>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Selected Seats:
          </Typography>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {selectedSeats.map((seat) => (
              <Typography
                key={seat}
                component="span"
                sx={{
                  backgroundColor: "#e0e0e0",
                  padding: "5px",
                  borderRadius: "4px",
                }}
              >
                {seat}
              </Typography>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "5px",
            }}
          >
            {seatRows.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map((seat, columnIndex) => {
                  const isTaken = takenSeats.includes(seat);
                  return (
                    <div
                      key={`${rowIndex}-${columnIndex}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        border: "1px solid black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: isTaken ? "default" : "pointer",
                        backgroundColor: isTaken
                          ? "red"
                          : selectedSeats.includes(seat)
                          ? "green"
                          : "white",
                      }}
                      onClick={() => !isTaken && handleSeatClick(seat)}
                    >
                      {seat}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleProceedToPayment}
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
