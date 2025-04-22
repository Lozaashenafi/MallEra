import API from "../utils/api";

export const getDashboard = async (mallId) => {
  try {
    const response = await API.get(`/dashboard/${mallId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch dashboard data"
    );
  }
};
