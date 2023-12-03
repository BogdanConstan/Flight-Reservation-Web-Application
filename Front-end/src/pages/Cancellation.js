import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Paper, Typography, Container } from "@mui/material";

const CancellationPage = () => {
  const [ticketId, setTicketId] = useState("");
  const [message, setMessage] = useState("");

  const handleCancellation = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/cancel-ticket`,
        null,
        {
          params: { ticketId },
        }
      );
      setMessage(response.data);
    } catch (error) {
      console.error("Error canceling ticket:", error);
      setMessage("Failed to cancel ticket.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: "20px", marginTop: "30px" }}>
        <Typography variant="h5" gutterBottom>
          Cancel Your Ticket
        </Typography>
        <TextField
          label="Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCancellation}
          style={{ marginTop: "10px" }}
        >
          Cancel Ticket
        </Button>
        {message && (
          <Typography color="textSecondary" style={{ marginTop: "20px" }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default CancellationPage;
