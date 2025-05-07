import React, { useState } from "react";
import { logout } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import profile from "../../assets/images/profile.jpeg";
import { FiLogOut, FiHome, FiPlusCircle, FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext.jsx";

function OwnerHeader() {
  const { userData } = useAuth();

  const { unreadCount } = useNotifications();
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="fixed top-0 left-64 right-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
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

        {/* Notification Icon */}
        <Link to={"/owner/notifications"} className="relative">
          <FiBell className="text-gray-700 text-2xl hover:text-cyan-600 transition duration-300" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Profile Section */}
        <div className="flex items-center space-x-3">
          <img
            src={profile}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500"
          />
          <Link to={"/owner/profile"}>
            <span className="font-medium text-gray-800">
              {userData?.fullName}
            </span>
          </Link>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <Link
            to={"/"}
            className="flex items-center text-cyan-900 font-medium hover:text-cyan-600 transition duration-300"
          >
            <FiHome className="mr-1" /> Home
          </Link>
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
