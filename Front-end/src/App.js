import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"; // Existing import
import SignupPage from "./pages/SignupPage"; // Import the new SignupPage
import FlightSearch from "./pages/FlightSearch";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />{" "}
        {/* New signup route */}
        <Route path="/flight-search" element={<FlightSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
