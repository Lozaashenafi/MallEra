import API from "../utils/api";

// Register Mall
export const registerMall = async (mallData) => {
  console.log(mallData);
  try {
    const response = await API.post("/mall/register", mallData);
    console.log("API Response in registerMall:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Mall registration failed"
    );
  }
};

// Get Mall Details (example of another API call)
export const getMall = async () => {
  try {
    const response = await API.get(`/mall/malls/`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch mall details"
    );
  }
};
export const getOwners = async () => {
  try {
    const response = await API.get(`/mall/owners`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch mall details"
    );
  }
};
// Get Mall Details (example of another API call)
export const getMallDetails = async (mallId) => {
  try {
    const response = await API.get(`/mall/${mallId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch mall details"
    );
  }
};

// Update Mall Information
export const updateMall = async (mallId, mallData) => {
  try {
    const response = await API.put(`/mall/update/${mallId}`, mallData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Mall update failed");
  }
};
// User Registration
export const ownerRegister = async (userData) => {
  try {
    const response = await API.post("/mall/owner/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// Delete Mall
export const deleteMall = async (mallId) => {
  try {
    const response = await API.delete(`/malls/${mallId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Mall deletion failed");
  }
};
