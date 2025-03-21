import React, { useState, useEffect } from "react";
import { tenantRegister, getTenants } from "../../api/tenant"; // Import API functions
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toast
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TenantManagement = () => {
  const [tenants, setTenants] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    mallId: "", // Start with an empty mallId
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { userData } = useAuth();

  useEffect(() => {
    // Check if userData is available
    if (userData && userData.mallId) {
      setFormData((prevData) => ({
        ...prevData,
        mallId: userData.mallId, // Set mallId once userData is available
      }));
      fetchTenants(); // Fetch tenants when mallId is available
    }
  }, [userData]); // Re-run this effect when userData changes

  const fetchTenants = async () => {
    if (!userData.mallId) return;
    setLoading(true);
    try {
      const response = await getTenants(userData.mallId); // Get tenants data from API
      console.log("Tenants fetched:", response); // Log the response for debugging
      setTenants(response.tenants); // Assuming the API returns { tenants: [...] }
    } catch (error) {
      console.error("Error fetching tenants:", error);
      setMessage(error.message);
      toast.error("Error fetching tenants: " + error.message); // Toast error message
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form to add a tenant
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await tenantRegister(formData);
      setMessage(response.message);
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      fetchTenants(); // Refresh list after adding
      toast.success("Tenant added successfully!"); // Toast success message
    } catch (error) {
      console.error("Error adding tenant:", error);
      setMessage(error.message);
      toast.error("Error adding tenant: " + error.message); // Toast error message
    } finally {
      setLoading(false);
    }
  };

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.fullName.toLowerCase().includes(search.toLowerCase()) ||
      tenant.email.toLowerCase().includes(search.toLowerCase()) ||
      tenant.phoneNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (tenant) => {
    // Add edit functionality here
    console.log("Edit tenant:", tenant);
  };

  const handleDelete = (tenantId) => {
    // Add delete functionality here
    console.log("Delete tenant with ID:", tenantId);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Tenant Management</h2>
      {/* Add Tenant Form */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">Add Tenant</h3>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />

          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white p-2 rounded"
          >
            {loading ? "Adding..." : "Add Tenant"}
          </button>
        </form>
      </div>
      {/* Search Tenant */}
      <TextField
        label="Search Tenant"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* List Tenants */}
      <div className="bg-white shadow-md rounded p-4">
        <h3 className="text-lg font-semibold mb-3">List Tenants</h3>

        {filteredTenants.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell>{tenant.fullName}</TableCell>
                    <TableCell>{tenant.email}</TableCell>
                    <TableCell>{tenant.phoneNumber}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(tenant)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(tenant.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No tenants found.</p>
        )}
      </div>
      <ToastContainer /> {/* Toast container to render toasts */}
    </div>
  );
};

export default TenantManagement;
