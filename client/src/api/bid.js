import API from "../utils/api";
export const getPostBids = async (postId) => {
  try {
    const response = await API.get(`/owner/bid/${postId}`);
    // console.log("Fetched posts:", response.data); // Ensure this logs an array
    return response.data; // Default to an empty array
  } catch (error) {
    // console.error("Error fetching posts:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch bids");
  }
};
export const declineBid = async (id) => {
  try {
    const response = await API.post(`/owner/bid/decline`, {
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
export const acceptBid = async (data) => {
  try {
    const response = await API.post(`/owner/bid/accept`, data);
    console.log("request accept successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch requests"
    );
  }
};
