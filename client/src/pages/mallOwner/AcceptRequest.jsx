import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { acceptRequest } from "../../api/request";
import { toast, ToastContainer } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify

function AcceptRequest() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: parseInt(id, 10), // Ensure the ID is a number
    visitDate: "",
    paymentDate: "",
    ownerName: "",
    ownerPhone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.visitDate ||
      !formData.paymentDate ||
      !formData.ownerName ||
      !formData.ownerPhone
    ) {
      toast.error("All fields are required!"); // Show error toast
      return;
    }

    setLoading(true);

    try {
      const response = await acceptRequest(formData);
      toast.success(response.message); // Show success toast

      setFormData({
        visitDate: "",
        paymentDate: "",
        ownerName: "",
        ownerPhone: "",
      });
    } catch (error) {
      toast.error(error.response?.message || "Something went wrong!"); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-6  bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Accept Request
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Visit Date
            </label>
            <input
              type="date"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Payment Date Limit
            </label>
            <input
              type="date"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Owner Name
            </label>
            <input
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Owner Phone
            </label>
            <input
              type="tel"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-800 transition duration-300"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

export default AcceptRequest;
