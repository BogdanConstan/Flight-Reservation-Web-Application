import React from "react";
import { Container, Typography, Box, Grid, Link, Paper } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Header />

      <Container maxWidth="md" style={{ marginTop: "30px" }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Typography variant="body1" gutterBottom>
            For inquiries and assistance, you can reach us via email or phone:
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong>{" "}
            <Link href="mailto:info@crowsnestairways.com">
              info@crowsnestairways.com
            </Link>
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> +1 (123) 456-7890
          </Typography>
        </Paper>
      </Container>

      <Footer />
    </>
  );
};

export default Contact;
