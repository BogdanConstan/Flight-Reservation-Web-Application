import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  return (
    <>
      <Container maxWidth="md" style={{ marginTop: "30px" }}>
        <Typography variant="h4" gutterBottom>
          Frequently Asked Questions (FAQ)
        </Typography>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">How do I make a reservation?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              To make a reservation, visit our homepage and enter your travel
              details. Follow the steps to select your flight and complete the
              booking process.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">What is the baggage policy?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Our baggage policy varies by class of service and route. Please
              visit our Baggage Information page for detailed information on
              baggage allowances.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography variant="h6">
              How can I change or cancel my reservation?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              You can manage your reservation by logging in to your account on
              our website. From there, you can make changes to your booking or
              cancel your reservation following our policies.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>

      <Footer />
    </>
  );
};

export default FAQ;
