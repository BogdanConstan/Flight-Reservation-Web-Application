import React, { useState } from "react";
import axios from "axios"; // Import axios
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../components/Header";
import Footer from "../components/Footer";

const LoginPage = ({ updateLoginStatus }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          username,
          password,
        }
      );

      console.log("Login successful:", response.data);
      updateLoginStatus(response.data.firstName); // Call the updateLoginStatus passed from App.js
      navigate("/"); // Navigate to homepage or dashboard
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error
      );
      alert("Login failed: Incorrect username or password");
    }
  };

  return (
    <Box>
      <Container maxWidth="sm" sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                Create User
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default LoginPage;
