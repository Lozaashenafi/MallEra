import API from "../utils/api";

// Fetch Subscriptions
export const getSubscriptions = async () => {
  try {
    const response = await API.get("/subscription/getall");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch subscriptions"
    );
  }
};
export const getSubscriptionById = async (id) => {
  try {
    const response = await API.get(`/subscription/get/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch subscription"
    );
  }
};
export const createSubscription = async (subscriptionData) => {
  try {
    const response = await API.post("/subscription/add", subscriptionData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create subscription"
    );
  }
};
