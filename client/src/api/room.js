import API from "../utils/api";

// Fetch Categories
export const getCategories = async () => {
  try {
    const response = await API.get(`/room/category`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
};

// Fetch Floors by Mall ID
export const getMallFloors = async (mallId) => {
  try {
    const response = await API.get(`/room/floors`, { params: { mallId } });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch floors");
  }
};

export const addRoom = async (roomData) => {
  console.log("Sending data:", roomData);
  try {
    const response = await API.post("/room/add", roomData);
    console.log("Room added successfully:", response.data);
    return response.data;
  } catch (error) {
    throw error; // Ensure the error is thrown so it can be caught in handleSubmit
  }
};
export const deleteRoom = async (roomId) => {
  try {
    const response = await API.delete(`/room/delete/${roomId}`);
    console.log("Room deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateRoom = async (roomId, roomData) => {
  try {
    const response = await API.put(`/room/update/${roomId}`, roomData);
    console.log("Room updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getRooms = async (mallId) => {
  try {
    const response = await API.get(`/room/list`, { params: { mallId } });
    console.log("Fetched rooms:", response);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch rooms");
  }
};
export const getAvailableRooms = async (mallId) => {
  try {
    const response = await API.get(`/room/availablelist`, {
      params: { mallId },
    });
    console.log("Fetched rooms:", response);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch rooms");
  }
};
export const updateRoomPrice = async (roomData) => {
  try {
    const response = await API.post(`/room/price`, roomData);
    console.log("Room price updated successfully:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getPricePerCareList = async (mallId) => {
  try {
    const response = await API.get(`/mall/pricePerCare/list`, {
      params: { mallId },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch room price"
    );
  }
};
export const getCurrentPricePerCare = async (mallId) => {
  try {
    const response = await API.get(`/room/pricePerCare`, {
      params: { mallId },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch current price"
    );
  }
};
export const updatePricePerCare = async (priceData) => {
  try {
    const response = await API.get(`/room/pricePerCare/list`, priceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
