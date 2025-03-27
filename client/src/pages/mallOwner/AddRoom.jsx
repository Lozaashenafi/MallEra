import { useEffect, useState } from "react";
import { addRoom, getCategories, getMallFloors } from "../../api/room";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

export default function AddRoom() {
  const [floors, setFloors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    floorId: "",
    categoryId: "",
    roomNumber: "",
    care: "",
    pricePerCare: true, // Default value
    hasWindow: false,
    hasBalcony: false,
    hasAttachedBathroom: false,
    hasParkingSpace: false,
  });

  const { userData } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!userData?.mallId) return;
        const data1 = await getMallFloors(userData.mallId);
        const data = await getCategories();
        setFloors(data1);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    fetchData();
  }, [userData.mallId]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addRoom(formData);
      console.log("API Response:", res);

      toast.success(res.message || "Room added successfully!");

      // Reset the form after successful submission
      setFormData({
        floorId: "",
        categoryId: "",
        roomNumber: "",
        care: "",
        pricePerCare: true, // Default value
        hasWindow: false,
        hasBalcony: false,
        hasAttachedBathroom: false,
        hasParkingSpace: false,
      });
    } catch (error) {
      // console.error("Error adding room:", error);

      // // Log the full error object for debugging
      // console.error("Full Error Object:", error);
      // console.error("Error Response Data:", error.response?.data);

      // Correctly extract the error message
      const errorMessage =
        error.response?.data?.message || // Extract from response data
        error.message || // Fallback to Axios error message
        "Failed to save room. Please try again.";

      console.log("Error Message:", errorMessage); // Debugging
      toast.error(errorMessage); // Show toast notification
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5">
        <h2 className="text-xl font-bold mb-4">Add Room</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Floor Select */}
          <div>
            <select
              name="floorId"
              value={formData.floorId}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            >
              <option value="">Select Floor</option>
              {floors.map((floor) => (
                <option key={floor.id} value={floor.id}>
                  {floor.description}
                </option>
              ))}
            </select>
          </div>

          {/* Category Select (Optional) */}
          <div>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            >
              <option value="">Select Category (Optional)</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Room Number Input */}
          <div>
            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={formData.roomNumber}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Care Input */}
          <div>
            <input
              type="number"
              name="care"
              placeholder="Care"
              value={formData.care}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Price Per Care Input */}
          <div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="pricePerCare"
                checked={formData.pricePerCare}
                onChange={handleChange}
              />
              <label>Price Per Care</label>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasWindow"
              checked={formData.hasWindow}
              onChange={handleChange}
            />
            <label>Has Window</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasBalcony"
              checked={formData.hasBalcony}
              onChange={handleChange}
            />
            <label>Has Balcony</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasAttachedBathroom"
              checked={formData.hasAttachedBathroom}
              onChange={handleChange}
            />
            <label>Has Attached Bathroom</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasParkingSpace"
              checked={formData.hasParkingSpace}
              onChange={handleChange}
            />
            <label>Has Parking Space</label>
          </div>

          {/* Submit Button */}
          <div className=" justify-items-end">
            <button
              type="submit"
              className="w-1xl bg-cyan-700 text-white font-semibold py-2 px-4 rounded hover:bg-cyan-500 transition duration-300"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
