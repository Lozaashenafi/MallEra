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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { getRooms, updateRoom, deleteRoom } from "../../api/room"; // Update this import as per your API utility
import { useAuth } from "../../context/AuthContext";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RoomList() {
  const { userData } = useAuth();
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("roomNumber");
  const [order, setOrder] = useState("asc");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [updatedRoomNumber, setUpdatedRoomNumber] = useState("");
  const [updatedCare, setUpdatedCare] = useState("");

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await getRooms(userData.mallId);
        console.log("Fetched rooms:", response);
        setRooms(response || []);
      } catch (err) {
        setError("Failed to fetch rooms.");
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, [userData.mallId]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredRooms = (rooms || []).filter(
    (room) =>
      room.roomNumber.toString().includes(search) ||
      room.floor?.description?.toLowerCase().includes(search.toLowerCase()) ||
      room.status.toLowerCase().includes(search.toLowerCase())
  );

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setUpdatedRoomNumber(room.roomNumber);
    setUpdatedCare(room.care);
    setOpenEdit(true);
  };

  const handleDelete = (room) => {
    setSelectedRoom(room);
    setOpenDelete(true);
  };

  const confirmUpdate = async () => {
    try {
      await updateRoom(selectedRoom.id, {
        roomNumber: updatedRoomNumber,
        care: updatedCare,
      });
      setOpenEdit(false);
      setSelectedRoom(null);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update room:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteRoom(selectedRoom.id);
      setOpenDelete(false);
      setSelectedRoom(null);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete room:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5">
      <TextField
        label="Search Room"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {rooms.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {["roomNumber", "floor", "price", "status", "care"].map(
                  (col) => (
                    <TableCell key={col}>
                      <TableSortLabel
                        active={orderBy === col}
                        direction={orderBy === col ? order : "asc"}
                        onClick={() => handleSort(col)}
                      >
                        {col.charAt(0).toUpperCase() + col.slice(1)}
                      </TableSortLabel>
                    </TableCell>
                  )
                )}
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRooms.map((room) => (
                <TableRow key={room.id} hover>
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.floor?.description || "N/A"}</TableCell>
                  <TableCell>${room.price}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        room.status === "AVAILABLE"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {room.status}
                    </span>
                  </TableCell>
                  <TableCell>{room.care || "N/A"}</TableCell>
                  <TableCell>
                    {room.status === "AVAILABLE" && (
                      <>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(room)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(room)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No rooms found.</p>
      )}

      {/* Edit Popup */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Room</DialogTitle>
        <DialogContent>
          <TextField
            label="Room Name"
            fullWidth
            value={updatedRoomNumber}
            onChange={(e) => setUpdatedRoomNumber(e.target.value)}
            style={{ marginTop: 16 }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Care"
            fullWidth
            value={updatedCare}
            onChange={(e) => setUpdatedCare(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={confirmUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Popup */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this room?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
