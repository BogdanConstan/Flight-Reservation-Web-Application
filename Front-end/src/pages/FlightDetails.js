import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Paper } from "@mui/material";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FlightDetails = () => {
  const { flightId } = useParams();
  const [aircraftId, setAircraftId] = useState(null);
  const [seatMap, setSeatMap] = useState([]);

  useEffect(() => {
    const fetchAircraftId = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/aircraftId/${flightId}`);
        setAircraftId(response.data);
      } catch (error) {
        console.error('Error fetching aircraft:', error);
        // Handle error as needed
      }
    };

    fetchAircraftId();
  }, [flightId]);

  useEffect(() => {
    const fetchSeats = async () => {
      if (aircraftId) {
        try {
          const response = await axios.get(`http://localhost:8080/seats/${aircraftId}`);
          setSeatMap(response.data);
        } catch (error) {
          console.error('Error fetching seats:', error);
          // Handle error as needed
        }
      }
    };

    fetchSeats();
  }, [aircraftId]);

  
  const generateSeatRows = () => {
    const rows = [];
    const alphabet = 'ABCDEF'; // Update to the desired number of columns, e.g., 'ABCDEF' for 6 columns
  
    // Generate rows and columns with alternating seat positions
    for (let i = 1; i <= 20; i++) { // Assuming 20 rows, adjust as needed
      const row = [];
      for (let j = 0; j < 6; j++) { // Total number of seats per row (adjust as needed)
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
          
          {/* Display seats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
            {seatRows.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map((seat, columnIndex) => (
                  <div
                    key={`${rowIndex}-${columnIndex}`}
                    style={{
                      width: seat ? '50px' : '10px', // Adjust the width for separation
                      height: '50px',
                      border: '1px solid black',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: seat ? 'pointer' : 'default',
                      backgroundColor: seat ? 'white' : 'transparent' // Optional: Background for separation
                      // You can add further styles or logic as needed
                    }}
                    onClick={() => {
                      // Handle seat selection logic if needed
                      if (seat) console.log(`Selected seat: ${seat}`);
                    }}
                  >
                    {seat}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          
          {/* Other content of FlightDetails component */}
          {/* ... */}
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default FlightDetails;
