import React from "react";
import { Container, Typography, Box, Link as MuiLink } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{ bgcolor: "primary.main", color: "white", p: 3 }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Typography variant="body1">FAQ</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <MuiLink
            href="https://www.facebook.com"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </MuiLink>
          {" | "}
          <MuiLink
            href="https://www.twitter.com"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </MuiLink>
          {" | "}
          <MuiLink
            href="https://www.linkedin.com"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
