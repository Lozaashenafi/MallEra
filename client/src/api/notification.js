import API from "../utils/api";

export const getNotifications = async (userId) => {
  try {
    const response = await API.get(`/notification/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch notifications"
    );
  }
};
