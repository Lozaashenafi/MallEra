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
export const getMyPost = async (userId) => {
  try {
    const response = await API.get(`/post/mypost`, { params: { userId } });
    console.log("Fetched posts:", response.data); // Ensure this logs an array
    return response.data || []; // Default to an empty array
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};
export const getPostDetail = async (userId) => {
  try {
    const response = await API.get(`/post/list/${userId}`);
    console.log("Fetched posts:", response.data); // Ensure this logs an array
    return response.data || []; // Default to an empty array
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};
// in api/post.js
export const updatePost = async (formData) => {
  try {
    const response = await API.put("/post/update", formData);
    console.log("Post updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error.response?.data || error);
    throw error;
  }
};
export const HidePost = async (postId) => {
  try {
    const response = await API.get(`/post/hide/${postId}`);
    console.log("Post hidden successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error hiding post:", error.response?.data || error);
    throw error;
  }
};
