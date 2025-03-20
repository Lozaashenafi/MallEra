import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import OwnerSidebar from "../components/layout/OwnerSidebar";
import { logout } from "../api/auth"; // Import logout function
import { useAuth } from "../context/AuthContext";
import profile from "../assets/images/profile.jpeg";
function OwnerLayout({ user }) {
  const handleLogout = () => {
    logout();
  };
  const { userData } = useAuth();

  return (
    <>
      <div className="flex min-h-screen w-full">
        <OwnerSidebar />
        <main className="flex-1 ml-60 bg-gray-100 p-6">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search your courses"
              className="border px-4 py-2 rounded w-1/3"
            />
            <div className="flex items-center space-x-10 ">
              {/* Profile section */}
              <div className="flex items-center space-x-2">
                <img
                  src={profile} // Assuming user has a profile image URL
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-gray-800">
                  {userData?.fullName}
                </span>
              </div>
              {/* Buttons */}
              <div className="space-x-4">
                <button className="text-cyan-900 font-medium hover:underline">
                  Home
                </button>
                <button
                  className="text-cyan-900 font-medium hover:underline"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default OwnerLayout;
