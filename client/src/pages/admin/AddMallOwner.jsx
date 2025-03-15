import React, { useState, useEffect } from "react";
import { getMall } from "../../api/mall";
import { ownerRegister } from "../../api/mall";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddMallOwner() {
  const [malls, setMalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    mallId: "",
  });

  // Fetch malls for the dropdown
  useEffect(() => {
    const fetchMalls = async () => {
      try {
        const data = await getMall();
        if (data.success) {
          setMalls(data.malls);
        }
      } catch (error) {
        console.error("Error fetching malls:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMalls();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await ownerRegister(formData);
      toast.success("Mall Owner registered successfully!"); // Show success toast
      console.log("Owner Registered: ", response);

      // Reset form data after successful registration
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        mallId: "",
      });
    } catch (error) {
      setError(error.message || "Registration failed");
    }
  };

  return (
    <section className="mt-6">
      <h1 className="text-2xl font-bold text-gray-800">Add Mall Owner</h1>
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="+1 234 567 890"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mall Selection Dropdown */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium">
              Select Mall
            </label>
            <select
              name="mallId"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={formData.mallId}
              onChange={handleChange}
              required
            >
              <option value="">Select a mall</option>
              {malls.map((mall) => (
                <option key={mall.id} value={mall.id}>
                  {mall.mallName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Add Mall Owner
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="col-span-1 md:col-span-2 text-red-600 mt-4">
              <p>{error}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default AddMallOwner;
