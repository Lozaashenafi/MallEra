import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { acceptRequest } from "../../api/request";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AcceptRequest() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: parseInt(id, 10),
    visitDate: "",
    paymentDate: "",
    ownerName: "",
    ownerPhone: "",
    firstPayment: "",
    paymentDuration: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      visitDate,
      paymentDate,
      ownerName,
      ownerPhone,
      firstPayment,
      paymentDuration,
      message,
    } = formData;

    if (
      !visitDate ||
      !paymentDate ||
      !ownerName ||
      !ownerPhone ||
      !firstPayment ||
      !paymentDuration ||
      !message
    ) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await acceptRequest(formData);
      toast.success(response.message);

      setFormData({
        visitDate: "",
        paymentDate: "",
        ownerName: "",
        ownerPhone: "",
        firstPayment: "",
        paymentDuration: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Accept Request
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Existing Fields */}
          <div>
            <label className="block text-gray-700 font-medium">
              Visit Date
            </label>
            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Payment Date Limit
            </label>
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Owner Phone
            </label>
            <input
              type="tel"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* New Fields */}
          <div>
            <label className="block text-gray-700 font-medium">
              First Payment
            </label>
            <input
              type="number"
              name="firstPayment"
              value={formData.firstPayment}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              min="0"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Payment Duration (Months)
            </label>
            <input
              type="number"
              name="paymentDuration"
              value={formData.paymentDuration}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              min="1"
            />
          </div>

          {/* Message Textarea (full width) */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter additional notes or message..."
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-800 transition duration-300"
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default AcceptRequest;
