import React from "react";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import backgroundImage from "../pic.jpg";
import { styled } from "@mui/material/styles";

const About = () => {
  const StyledContainer = styled(Container)(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    backdropFilter: "blur(8px)",
  }));

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(3, 0),
    backgroundColor: "#f5f5f5",
  }));

  const BackgroundImageContainer = styled("div")({
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  });

  return (
    <Box position="relative">
      <BackgroundImageContainer />
      <StyledContainer maxWidth="md">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <Typography style={{ fontSize: 60, color: "#123456" }}>
              About Us
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{ fontSize: "2.5rem", fontWeight: "bold" }}
              gutterBottom
            >
              Welcome to Crowsnest Airways
            </Typography>
            <Typography
              style={{ fontSize: "1.5rem", fontStyle: "italic" }}
              gutterBottom
            >
              Your Trusted Airline Partner
            </Typography>
          </Grid>
        </Grid>

        <StyledPaper>
          <Typography style={{ fontSize: "1.2rem" }}>
            Crowsnest Airways is a leading airline in the industry, dedicated to
            providing top-notch flight experiences to our passengers. With a
            commitment to safety, comfort, and exceptional service, we've been
            soaring the skies for over a decade.
          </Typography>
          <Typography style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
            Our fleet consists of modern and reliable aircraft, ensuring that
            your journey with us is smooth and enjoyable. Whether you're
            traveling for business or leisure, we've got you covered.
          </Typography>
          <Typography style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
            At Crowsnest Airways, we believe in making air travel accessible to
            all. Our competitive prices and flexible booking options make it
            easier than ever to explore new horizons.
          </Typography>
          <Typography style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
            Thank you for choosing Crowsnest Airways for your travel needs. We
            look forward to serving you on your next adventure.
          </Typography>
        </StyledPaper>
      </StyledContainer>
      <Footer />
    </Box>
  );
};

export default About;
