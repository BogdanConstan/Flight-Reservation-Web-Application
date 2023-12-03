import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import SignupPage from "./pages/SignupPage";
import FlightSearch from "./pages/FlightSearch";
import AdminBrowseFlights from "./pages/admin/AdminBrowseFlights";
import FlightDetails from "./pages/FlightDetails";
import AdminBrowseCrews from "./pages/admin/AdminBrowseCrews";
import AdminBrowseAircrafts from "./pages/admin/AdminBrowseAircrafts";
import AdminManageCrew from "./pages/admin/AdminManageCrew";
import AdminManageAircraft from "./pages/admin/AdminManageAircraft";
import AdminManageDestinations from "./pages/admin/AdminManageDestinations";
import AdminManageFlights from "./pages/admin/AdminManageFlights";
import AdminPrintUsers from "./pages/admin/AdminPrintUsers";
import FlightAttendantLogin from "./pages/FlightAttendantLogin";
import FlightAttendantDashboard from "./pages/FlightAttendantDashboard";
import FlightAttendantBrowseFlights from "./pages/flight-attendant/FlightAttendantBrowseFlights";
import Confirmation from "./pages/Confirmation";
import Cancellation from "./pages/Cancellation";

import Payment from "./pages/Payment";
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
        <Route path="/flight-details/:flightId" element={<FlightDetails />} />

        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/cancellation" element={<Cancellation />} />
        {/* Admin routes */}
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
        <Route path="/admin/manage-flights" element={<AdminManageFlights />} />
        <Route path="/admin/print-users" element={<AdminPrintUsers />} />
        {/* Flight Attendant routes */}
        <Route
          path="/flight-attendant-login"
          element={<FlightAttendantLogin />}
        />
        <Route
          path="/flight-attendant-dashboard"
          element={<FlightAttendantDashboard />}
        />
        <Route
          path="/flight-attendant/browse-flights"
          element={<FlightAttendantBrowseFlights />}
        />
      </Routes>
    </Router>
  );
}

export default App;
