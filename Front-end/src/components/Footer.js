import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#123456", color: "white", p: 3 }} component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Crowsnest Airways</Typography>
            <Typography variant="body2">Fly with the crows!</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Quick Links</Typography>
            <RouterLink
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Home
            </RouterLink>
            <br />
            <RouterLink
              to="/about"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              About Us
            </RouterLink>
            <br />
            <RouterLink
              to="/contact"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Contact
            </RouterLink>
            <br />
            <RouterLink
              to="/faq"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              FAQ
            </RouterLink>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Follow Us</Typography>
            <MuiLink
              href="https://www.facebook.com"
              color="inherit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon /> Facebook
            </MuiLink>
            <br />
            <MuiLink
              href="https://www.twitter.com"
              color="inherit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon /> Twitter
            </MuiLink>
            <br />
            <MuiLink
              href="https://www.linkedin.com"
              color="inherit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon /> LinkedIn
            </MuiLink>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
