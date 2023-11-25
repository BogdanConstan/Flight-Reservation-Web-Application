import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = (event) => {
    event.preventDefault();
    // Placeholder for admin login logic
    alert(`Admin login attempted for username: ${username}`);
  };

  return (
    <Box>
      <Header />

      <Container maxWidth="sm" sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleAdminLogin}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                fullWidth
                autoFocus
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                fullWidth
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Admin Login
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default AdminLoginPage;
