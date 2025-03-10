import API from "../utils/api";

// Register Mall
export const registerMall = async (mallData) => {
  try {
    const response = await API.post("/malls/register", mallData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Mall registration failed"
    );
  }
};

// Get Mall Details (example of another API call)
export const getMallDetails = async (mallId) => {
  try {
    const response = await API.get(`/malls/${mallId}`);
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
    const response = await API.put(`/malls/${mallId}`, mallData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Mall update failed");
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
