import React, { useState, useEffect } from "react";
import { tenantRegister, getTenants, updateTenant } from "../../api/tenant";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
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
    mallId: "",
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (userData?.mallId) {
      setFormData((prevData) => ({
        ...prevData,
        mallId: userData.mallId,
      }));
      fetchTenants();
    }
  }, [userData]);

  const fetchTenants = async () => {
    if (!userData.mallId) return;
    setLoading(true);
    try {
      const response = await getTenants(userData.mallId);
      setTenants(response.tenants);
    } catch (error) {
      toast.error("Error fetching tenants: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await tenantRegister(formData);
      fetchTenants();
      toast.success("Tenant added successfully!");
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Error adding tenant: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tenant) => {
    setSelectedTenant(tenant);
    setUpdatedData({
      fullName: tenant.fullName,
      email: tenant.email,
      phoneNumber: tenant.phoneNumber,
    });
    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    if (!selectedTenant) return;
    try {
      await updateTenant(selectedTenant.id, updatedData);
      toast.success("Tenant updated successfully!");

      fetchTenants();
      setOpenEdit(false);
    } catch (error) {
      toast.error("Error updating tenant: " + error.message);
    }
  };

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.fullName.toLowerCase().includes(search.toLowerCase()) ||
      tenant.email.toLowerCase().includes(search.toLowerCase()) ||
      tenant.phoneNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Tenant Management</h2>

      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">Add Tenant</h3>
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

      <TextField
        label="Search Tenant"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />

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
                      <IconButton color="error">
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

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Tenant</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            className="mt-14"
            fullWidth
            value={updatedData.fullName}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, fullName: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={updatedData.email}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, email: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone Number"
            fullWidth
            value={updatedData.phoneNumber}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, phoneNumber: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default TenantManagement;
