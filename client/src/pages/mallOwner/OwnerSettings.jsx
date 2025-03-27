import React, { useState } from "react";

function OwnerSettings() {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    paymentMethod: "Credit Card",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings Updated Successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Profile Picture */}
          <div className="mb-4 text-center">
            <h3 className="text-lg font-medium">Profile Picture</h3>
            <div className="flex justify-center mt-2">
              <img
                src={profileImage || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500"
              />
            </div>
            <input type="file" onChange={handleFileChange} className="mt-2" />
          </div>

          {/* Profile Settings */}
          <div className="mb-4">
            <h3 className="text-lg font-medium">Profile Settings</h3>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <label className="block text-gray-700 mt-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <label className="block text-gray-700 mt-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Notifications Settings */}
          <div className="mb-4">
            <h3 className="text-lg font-medium">Notification Settings</h3>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={() =>
                  setFormData({
                    ...formData,
                    notifications: !formData.notifications,
                  })
                }
                className="w-5 h-5"
              />
              <span className="text-gray-700">Enable Notifications</span>
            </label>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Payment Settings */}
          <div className="mb-4">
            <h3 className="text-lg font-medium">Payment Settings</h3>
            <label className="block text-gray-700">
              Preferred Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Bank Transfer</option>
            </select>
          </div>

          {/* Security Settings */}
          <div className="mb-4">
            <h3 className="text-lg font-medium">Security Settings</h3>
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <label className="block text-gray-700 mt-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default OwnerSettings;
