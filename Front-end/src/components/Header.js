import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // For responsive menu
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff"; // Flight icon
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" style={{ background: "#123456" }}>
      {" "}
      {/* Example color */}
      <Container>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: "none" } }} // Hidden on larger screens
          >
            <MenuIcon />
          </IconButton>

          {/* Flight icon next to the brand name */}
          <FlightTakeoffIcon
            style={{
              color: "gold",
              marginRight: "8px",
              verticalAlign: "bottom",
            }}
          />

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Crowsnest Airways {/* Your Brand Logo Here */}
            </Link>
          </Typography>

          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          {/* Additional navigation items can be added here */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
