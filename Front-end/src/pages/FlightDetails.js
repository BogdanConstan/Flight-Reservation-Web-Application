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

  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    // You can pass necessary data to the payment page using state or context
    navigate("/payment", { state: { flightId, selectedSeats } });
  };

  const handleSeatClick = async (seat) => {
    if (seat) {
      const isAlreadySelected = selectedSeats.includes(seat);
      const updatedSelectedSeats = isAlreadySelected
        ? selectedSeats.filter((s) => s !== seat)
        : [...selectedSeats, seat];
      setSelectedSeats(updatedSelectedSeats);

      // Optionally, update the backend about the seat selection
      try {
        await axios.put("http://localhost:8080/seatAssigned", {
          seatNumber: seat,
          isSelected: !isAlreadySelected,
        });
      } catch (error) {
        console.error("Error updating seat:", error);
      }
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
        // Handle error as needed
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
        } catch (error) {
          console.error("Error fetching seats:", error);
          // Handle error as needed
        }
      }
    };

    fetchSeats();
  }, [aircraftId]);

  const generateSeatRows = () => {
    const rows = [];
    const alphabet = "ABCDEF"; // Update to the desired number of columns, e.g., 'ABCDEF' for 6 columns

    // Generate rows and columns with alternating seat positions
    for (let i = 1; i <= 20; i++) {
      // Assuming 20 rows, adjust as needed
      const row = [];
      for (let j = 0; j < 6; j++) {
        // Total number of seats per row (adjust as needed)
        row.push(`${i}${alphabet[j]}`);
        if (j === 2) {
          row.push(null); // Add a null item to create a separation between seat groups
        }
      }
      rows.push(row); // Push the generated row into the rows array
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
          {/* Display aircraftId */}
          <Typography variant="h6">Aircraft ID: {aircraftId}</Typography>

          {/* Display selected seats horizontally */}
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
          {/* Display seats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "5px",
            }}
          >
            {seatRows.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map((seat, columnIndex) => (
                  <div
                    key={`${rowIndex}-${columnIndex}`}
                    style={{
                      width: seat ? "50px" : "10px",
                      height: "50px",
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: seat ? "pointer" : "default",
                      backgroundColor: selectedSeats.includes(seat)
                        ? "green"
                        : seat
                        ? "white"
                        : "transparent",
                    }}
                    onClick={() => handleSeatClick(seat)}
                  >
                    {seat}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Other content of FlightDetails component */}
          {/* ... */}
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
