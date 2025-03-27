import API from "../utils/api";

export const addPost = async (data) => {
  try {
    const response = await API.post("/post/add", data);
    console.log("posted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error assigning post:", error.response?.data || error);
    throw error;
  }
};
