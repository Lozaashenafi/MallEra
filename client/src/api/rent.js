import API from "../utils/api";

export const assignRent = async (rentData) => {
  try {
    const response = await API.post("/rent/add", rentData);
    console.log("Rent assigned successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error assigning rent:", error.response?.data || error);
    throw error;
  }
};

export const getRents = async (mallId) => {
  try {
    const response = await API.get(`/rent/${mallId}/list`);
    console.log("Rents fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching rents:", error.response?.data || error);
    throw error;
  }
};
