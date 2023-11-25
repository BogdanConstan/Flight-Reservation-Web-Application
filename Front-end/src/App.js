import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import SignupPage from "./pages/SignupPage";
import FlightSearch from "./pages/FlightSearch";
import AdminBrowseFlights from "./pages/admin/AdminBrowseFlights"; // Updated import
import AdminBrowseCrews from "./pages/admin/AdminBrowseCrews"; // Updated import
import AdminBrowseAircrafts from "./pages/admin/AdminBrowseAircrafts"; // Updated import
import AdminManageCrew from "./pages/admin/AdminManageCrew"; // Updated import
import AdminManageAircraft from "./pages/admin/AdminManageAircraft"; // Updated import
import AdminManageDestinations from "./pages/admin/AdminManageDestinations"; // Updated import
import AdminModifyFlights from "./pages/admin/AdminModifyFlights"; // Updated import
import AdminPrintUsers from "./pages/admin/AdminPrintUsers"; // Updated import
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/flight-search" element={<FlightSearch />} />
        {/* Updated routes for admin functionalities */}
        <Route path="/admin/browse-flights" element={<AdminBrowseFlights />} />
        <Route path="/admin/browse-crews" element={<AdminBrowseCrews />} />
        <Route
          path="/admin/browse-aircrafts"
          element={<AdminBrowseAircrafts />}
        />
        <Route path="/admin/manage-crew" element={<AdminManageCrew />} />
        <Route
          path="/admin/manage-aircraft"
          element={<AdminManageAircraft />}
        />
        <Route
          path="/admin/manage-destinations"
          element={<AdminManageDestinations />}
        />
        <Route path="/admin/modify-flights" element={<AdminModifyFlights />} />
        <Route path="/admin/print-users" element={<AdminPrintUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
