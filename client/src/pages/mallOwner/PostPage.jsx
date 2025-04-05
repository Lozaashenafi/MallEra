import React, { useState, useEffect } from "react";
import { FiUpload, FiImage, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { addPost } from "../../api/post";
import { getAvailableRooms } from "../../api/room";
import { toast, ToastContainer } from "react-toastify";

function PostPage() {
  const [isBid, setIsBid] = useState(false);
  const [mallId, setMallId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [bidDeposit, setBidDeposit] = useState("");
  const [bidEndDate, setBidEndDate] = useState(""); // New state for bid end date
  const { userData } = useAuth();

  // Fetch available rooms when mallId changes
  useEffect(() => {
    setMallId(userData.mallId);
    if (mallId) {
      fetchAvailableRooms(mallId);
    }
  }, [mallId]);

  console.log("Rooms:", rooms);
  const fetchAvailableRooms = async (mallId) => {
    try {
      const availableRooms = await getAvailableRooms(mallId);
      setRooms(availableRooms);
      console.log(availableRooms);
    } catch (error) {
      console.error("Error fetching rooms:", error.message);
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("mallId", mallId);
    formData.append("roomId", selectedRoom);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("userId", userData?.userId);
    formData.append("status", "PENDING");

    // Conditionally append bid-related data if isBid is true
    if (isBid) {
      formData.append("bidDeposit", bidDeposit ? Number(bidDeposit) : 0);
      formData.append("bidEndDate", bidEndDate);
    }

    // Append images to FormData
    for (let i = 0; i < images.length; i++) {
      const response = await fetch(images[i]);
      const blob = await response.blob();
      const file = new File([blob], `image-${i}.jpg`, { type: "image/jpeg" });
      formData.append("images", file);
    }

    try {
      const response = await addPost(formData);
      toast.success(response.message || "Post created successfully:");

      // Reset form fields after success
      setTitle("");
      setDescription("");
      setPrice("");
      setBidDeposit("");
      setBidEndDate("");
      setIsBid(false);
      setSelectedRoom("");
      setImages([]);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || // Extract from response data
        error.message || // Fallback to Axios error message
        "Failed to save post. Please try again.";
      toast.error(errorMessage);
      console.error("Error creating post:", error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Create a Post
      </h2>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Bid or Not */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="bid"
                value="no"
                checked={!isBid}
                onChange={() => setIsBid(false)}
                className="form-radio"
              />
              <span>Regular Sale</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="bid"
                value="yes"
                checked={isBid}
                onChange={() => setIsBid(true)}
                className="form-radio"
              />
              <span>Bid</span>
            </label>
          </div>

          {/* Mall Selection */}
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          >
            <option value="">Select Available Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                Room {room.roomNumber}
              </option>
            ))}
          </select>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />

          {/* Description Textarea */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            rows="4"
            required
          ></textarea>

          {/* Price Input */}
          <input
            type="number"
            placeholder={isBid ? "Initial Price" : "Price"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />

          {/* Bid Deposit Input (Only if Bid is selected) */}
          {isBid && (
            <>
              <input
                type="number"
                placeholder="Bid Deposit"
                value={bidDeposit}
                onChange={(e) => setBidDeposit(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />

              {/* Bid End Date */}
              <input
                type="date"
                value={bidEndDate}
                onChange={(e) => setBidEndDate(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </>
          )}
        </div>

        {/* Right Column - Image Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upload Images (Max 3)</h3>

          <div className="grid grid-cols-3 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                >
                  <FiX />
                </button>
              </div>
            ))}

            {/* Upload Placeholder */}
            {images.length < 3 && (
              <label className="flex flex-col items-center justify-center border border-dashed p-4 rounded-lg cursor-pointer hover:bg-gray-100">
                <FiImage className="text-gray-400 text-3xl" />
                <span className="text-gray-500 text-sm">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition duration-300"
          >
            <FiUpload className="inline mr-2" /> Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostPage;
