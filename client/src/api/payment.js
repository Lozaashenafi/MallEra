import API from "../utils/api";

export const getPayments = async (mallId) => {
  try {
    const response = await API.get(`/payments/${mallId}/list`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch mall details"
    );
  }
};
export const getPayment = async (paymentId) => {
  try {
    const response = await API.get(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch payment details"
    );
  }
};
export const createPayment = async (payment) => {
  try {
    const response = await API.post(`/payments/pay`, payment);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Payment failed");
  }
};
