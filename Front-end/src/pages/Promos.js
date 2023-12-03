import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Button } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Barcode from "react-barcode";
import moment from "moment";

const Promos = ({ username }) => {
  // Assuming a username prop is passed
  const [ticketRedeemed, setTicketRedeemed] = useState(false);
  const [redeemDate, setRedeemDate] = useState("");
  const [nextAvailableDate, setNextAvailableDate] = useState("");

  useEffect(() => {
    const redeemedKey = `redeemedTime_${username}`; // User-specific key
    const redeemedTime = localStorage.getItem(redeemedKey);
    if (redeemedTime) {
      const redeemedDate = new Date(parseInt(redeemedTime));
      const yearLater = new Date(redeemedDate).setFullYear(
        redeemedDate.getFullYear() + 1
      );

      setRedeemDate(moment(redeemedDate).format("MMMM Do YYYY, h:mm:ss a"));
      setNextAvailableDate(moment(yearLater).format("MMMM Do YYYY"));

      if (Date.now() < yearLater) {
        setTicketRedeemed(true);
      }
    }
  }, [username]);

  const handleRedeemTicket = () => {
    const now = Date.now();
    const redeemedKey = `redeemedTime_${username}`; // User-specific key
    localStorage.setItem(redeemedKey, now.toString());
    setRedeemDate(moment(now).format("MMMM Do YYYY, h:mm:ss a"));
    setNextAvailableDate(
      moment(new Date(now).setFullYear(new Date(now).getFullYear() + 1)).format(
        "MMMM Do YYYY"
      )
    );
    setTicketRedeemed(true);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Your Loyalty Rewards
      </Typography>

      {/* Monthly Promotions */}
      <Paper style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Monthly Promotions for December
        </Typography>
        <Typography>
          - Enjoy 20% off on all international flights this December! <br />
          - Exclusive holiday season discounts on select destinations. <br />-
          Double miles on all flights booked this month.
        </Typography>
      </Paper>

      {/* Airport Lounges */}
      <Paper style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Airport Lounge Access
        </Typography>
        <Typography>
          Enjoy access to our exclusive airport lounges at a discounted rate.{" "}
          <br />
          Show the QR code below at the lounge entrance to avail the discount.
        </Typography>
        <QrCodeIcon style={{ fontSize: 100, marginTop: "10px" }} />
      </Paper>

      {/* Free Companion Ticket */}
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Free Companion Ticket
        </Typography>
        <Typography>
          Receive a free companion ticket once a year as part of our loyalty
          program. <br />
          Redeem your ticket now and plan your next journey with a loved one!
        </Typography>
        {!ticketRedeemed ? (
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={handleRedeemTicket}
          >
            Redeem Free Ticket
          </Button>
        ) : (
          <>
            <Barcode value="123456789012" format="CODE128" />
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              Redeemed on: {redeemDate}
            </Typography>
            <Typography variant="body1">
              Next available date: {nextAvailableDate}
            </Typography>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Promos;
