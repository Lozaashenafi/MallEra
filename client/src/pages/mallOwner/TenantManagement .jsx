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
      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Error adding tenant: "
      );
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
      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Error updating tenant: "
      );
    }
  };

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.fullName.toLowerCase().includes(search.toLowerCase()) ||
      tenant.email.toLowerCase().includes(search.toLowerCase()) ||
      tenant.phoneNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="p-6 max-w-5xl mx-auto mt-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Tenant Management
        </h2>

        <div className=" p-6 rounded-lg ">
          <h3 className="text-2xl font-semibold mb-4">Add Tenant</h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              />
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="w-1xl bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition"
              >
                {loading ? "Adding..." : "Add Tenant"}
              </button>
            </div>
          </form>
        </div>

        <ToastContainer />
      </div>
      <div
        className="p-6   max-w-5xl gap-6 mt-4 mx-auto  shadow-md rounded-lg
      justify-center items-center bg-white "
      >
        <div
          className="p-6 max-w-5xl gap-6 mt-4 mx-auto  
      justify-center items-center bg-white"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            List Tenants
          </h2>
          <TextField
            label="Search Tenant"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => setSearch(e.target.value)}
          />
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
      </div>
    </>
  );
};

export default TenantManagement;
