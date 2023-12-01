import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  //TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminManageCrew = () => {
  const navigate = useNavigate();
  const [crews, setCrews] = useState([]);
  const [newCrew, setNewCrew] = useState({
    name: "",
    numCrewMembers: 0
  });

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/crew");
        console.log(response.data);
        setCrews(response.data);
      } catch (error) {
        console.error("Error fetching crews:", error.response.data);
        // Handle error as needed
      }
    };

    fetchCrews();
  }, []);

  const handleRemoveCrew = async (crew) => {
    try {
      await axios.delete(`http://localhost:8080/crew/${crew.id}`);
      setCrews(crews.filter((ac) => ac.id !== crew.id));
    } catch (error) {
      console.error("Error removing crew:", error.response.data);
      // Handle error as needed
    }
  };

  const handleAddCrew = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/crew",
        newCrew
      );
      setCrews([...crews, response.data.crew]);
      setNewCrew({
        name: "",
        numCrewMembers: 0
      });
    } catch (error) {
      console.error("Error adding crew:", error.response.data);
      // Handle error as needed
    }
  };

  const goBackToDashboard = () => {
    navigate("/admin-dashboard");
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Manage Crew
      </Typography>

      {/* Aircraft Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Crew ID</TableCell>
              <TableCell>Assigned</TableCell>
              <TableCell>Number of Crew Members</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crews.map((crew) => (
              <TableRow key={crew.id}>
                <TableCell>{crew.id}</TableCell>
                <TableCell>{crew.assigned ? "Yes" : "No"}</TableCell>
                <TableCell>{crew.numCrewMembers}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => handleRemoveCrew(crew)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Aircraft Form */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Add New Crew</Typography>
        {/* ... (existing form fields) */}
        <Button variant="contained" onClick={handleAddCrew}>
          Add Crew
        </Button>
      </Box>

      {/* Back to Dashboard Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={goBackToDashboard}
        sx={{ mt: 3 }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default AdminManageCrew;


/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
} from "@mui/material";

const AdminManageCrew = () => {
  const navigate = useNavigate();
  const [flightNumber, setFlightNumber] = useState("");
  const [crewData, setCrewData] = useState({
    flightNumber: "",
    crewMembers: [],
  });
  const [loading, setLoading] = useState(false);
  const [availableCrews, setAvailableCrews] = useState([]);
  const [selectedCrew, setSelectedCrew] = useState("");
  const [isFlightSearched, setIsFlightSearched] = useState(false);

  const fetchCrewData = async (flightNum) => {
    setLoading(true);
    setIsFlightSearched(true);
    // Simulate fetching crew data
    setTimeout(() => {
      setCrewData({
        flightNumber: flightNum,
        crewMembers: [
          "Captain Smith",
          "First Officer Jones",
          "Flight Attendant Brown",
        ],
      });
      setLoading(false);
    }, 1000);

    // Simulate fetching available crews
    setAvailableCrews([
      "Captain Green",
      "First Officer White",
      "Flight Attendant Black",
    ]);
  };

  const handleAddCrew = () => {
    if (selectedCrew) {
      setCrewData((prevCrewData) => ({
        ...prevCrewData,
        crewMembers: [...prevCrewData.crewMembers, selectedCrew],
      }));
      setSelectedCrew("");
    }
  };

  const handleRemoveCrew = (memberName) => {
    setCrewData((prevCrewData) => ({
      ...prevCrewData,
      crewMembers: prevCrewData.crewMembers.filter(
        (member) => member !== memberName
      ),
    }));
  };

  const goBackToDashboard = () => {
    navigate("/admin-dashboard");
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Manage Crew
      </Typography>
      <Box sx={{ mb: 4 }}>
        <TextField
          label="Flight Number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          onClick={() => fetchCrewData(flightNumber)}
          disabled={loading || !flightNumber}
        >
          {loading ? "Loading..." : "Search"}
        </Button>
      </Box>

      {isFlightSearched && crewData && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">
            Current Crew for Flight {crewData.flightNumber}
          </Typography>
          <List>
            {crewData.crewMembers.map((member, index) => (
              <ListItem key={index}>
                <ListItemText primary={member} />
                <Button
                  color="secondary"
                  onClick={() => handleRemoveCrew(member)}
                >
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {isFlightSearched && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Add Crew Member</Typography>
          <Select
            value={selectedCrew}
            onChange={(e) => setSelectedCrew(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>
              Select Crew Member
            </MenuItem>
            {availableCrews.map((crew, index) => (
              <MenuItem key={index} value={crew}>
                {crew}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={handleAddCrew}>
            Add Crew Member
          </Button>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={goBackToDashboard}
        sx={{ mt: 3 }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default AdminManageCrew;*/
