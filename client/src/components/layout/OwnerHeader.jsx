import React from "react";
import { logout } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import profile from "../../assets/images/profile.jpeg";
import { FiLogOut, FiHome, FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

function OwnerHeader() {
  const { userData } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search your courses..."
        className="border px-4 py-2 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {/* Profile and Actions */}
      <div className="flex items-center space-x-6">
        {/* Post Button */}
        <Link
          to={"/owner/post"}
          className="flex items-center bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition duration-300"
        >
          <FiPlusCircle className="mr-2" /> Post
        </Link>

        {/* Profile Section */}
        <div className="flex items-center space-x-3">
          <img
            src={profile}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500"
          />
          <span className="font-medium text-gray-800">
            {userData?.fullName}
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <button className="flex items-center text-cyan-900 font-medium hover:text-cyan-600 transition duration-300">
            <FiHome className="mr-1" /> Home
          </button>
          <button
            className="flex items-center text-red-600 font-medium hover:text-red-800 transition duration-300"
            onClick={handleLogout}
          >
            <FiLogOut className="mr-1" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default OwnerHeader;
