import API from "../utils/api";

export const getDashboard = async (mallId) => {
  try {
    const response = await API.get(`/dashboard/owner/${mallId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch dashboard data"
    );
  }
};

export const getDashboardAdmin = async () => {
  try {
    const response = await API.get("/dashboard/admin");
    console.log("Admin Dashboard Data:", response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch admin dashboard data"
    );
  }
};
