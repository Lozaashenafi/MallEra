import API from "../utils/api";
// api/mall.js
export const registerMallByItself = async (formData) => {
  try {
    const response = await API.post("/mall/register/me", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Error submitting mall data");
  }
};

export const mallInfo = async (mallData) => {
  console.log(mallData);
  try {
    const response = await API.post("/mall/save-mall-info", mallData);
    console.log("API Response in registerMall:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const approveMall = async (mallId) => {
  try {
    const response = await API.post(`/mall/approve`, { mallId });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const pendingMall = async () => {
  try {
    const response = await API.get("/mall/pending");
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Register Mall
export const registerMall = async (mallData) => {
  console.log(mallData);
  try {
    const response = await API.post("/mall/register", mallData);
    console.log("API Response in registerMall:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMallName = async (mallId) => {
  try {
    const response = await API.get(`/mall/${mallId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch mall name"
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
export const getMallById = async (mallId) => {
  try {
    const response = await API.get(`/mall/${mallId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch mall details"
    );
  }
};
export const getMallDetail = async (mallId) => {
  try {
    const response = await API.get(`/mall/detail/${mallId}`);
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
    throw error;
  }
};
// User Registration
export const ownerRegister = async (userData) => {
  try {
    const response = await API.post("/mall/owner/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete Mall
export const deleteMall = async (mallId) => {
  try {
    const response = await API.delete(`/mall/disable/${mallId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Mall deletion failed");
  }
};

export const updatePricePerCare = async (priceData) => {
  try {
    const response = await API.post(`/mall/pricepercare/add`, priceData);
    console.log("Price per care updated successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update price per care"
    );
  }
};
export const disableMall = async (mallId) => {
  try {
    const response = await API.get(`/mall/disable/${mallId}`);
    console.log("Mall disabled successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch price per care"
    );
  }
};
