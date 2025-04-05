import API from "../utils/api";
export const getPostRequests = async (postId) => {
  try {
    const response = await API.get(`/owner/request/${postId}`);
    console.log("Fetched posts:", response.data); // Ensure this logs an array
    return response.data; // Default to an empty array
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch requests"
    );
  }
};

export const acceptRequest = async (data) => {
  try {
    const response = await API.post(`/owner/request/accept`, data);
    console.log("request accepted successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch requests"
    );
  }
};

export const declineRequest = async (id) => {
  try {
    const response = await API.post(`/owner/request/decline`, {
      id: id,
    });
    console.log("request decline successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch requests"
    );
  }
};
