import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
  TextField,
} from "@mui/material";
import axios from "axios"; // To make API requests
import { getOwners } from "../../api/mall";

function MallOwnerTable() {
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("fullName");
  const [order, setOrder] = useState("asc");
  const [mallOwners, setMallOwners] = useState([]); // State to store mall owner data
  useEffect(() => {
    const fetchMallOwners = async () => {
      try {
        const data = await getOwners(); // Fetch mall owners
        console.log("API Response:", data); // Log full response

        if (data?.success && Array.isArray(data.mallOwners)) {
          console.log("Setting mall owners:", data.mallOwners); // Log extracted mallOwners
          setMallOwners(data.mallOwners);
        } else {
          console.error("Unexpected response structure:", data);
          setMallOwners([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching mall owners:", error.message);
        setMallOwners([]); // Prevent undefined issues
      }
    };
    fetchMallOwners();
  }, []);

  const filteredUsers = (mallOwners || []).filter(
    (user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phoneNumber.includes(search) // ✅ Corrected property name
  );

  // Sorting function
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Sorting logic
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy].toLowerCase() > b[orderBy].toLowerCase() ? 1 : -1;
    } else {
      return a[orderBy].toLowerCase() < b[orderBy].toLowerCase() ? 1 : -1;
    }
  });

  return (
    <div className="container mx-auto p-4">
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />
      {mallOwners.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {["fullName", "email", "phone", "mallName"].map((col) => (
                  <TableCell key={col}>
                    <TableSortLabel
                      active={orderBy === col}
                      direction={orderBy === col ? order : "asc"}
                      onClick={() => handleSort(col)}
                    >
                      {col.charAt(0).toUpperCase() + col.slice(1)}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>
                  <b>Details</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.mallName}</TableCell>
                  {/* Displaying mallName */}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className="bg-[#0e3746]"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No mall owners found.</p>
      )}
    </div>
  );
}

export default MallOwnerTable;
