import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import {
  FiBell,
  FiCheckCircle,
  FiTrash2,
  FiDollarSign,
  FiTag,
  FiClipboard,
} from "react-icons/fi";
import api from "../../utils/api";

const socket = io(import.meta.env.VITE_API_URL);

const NotificationSystem = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch notifications from localStorage when component is mounted
  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }

    if (userId) {
      socket.emit("registerUser", userId);
    }

    socket.on("newRequest", (data) => {
      setNotifications((prev) => {
        const newNotifications = [
          ...prev,
          {
            id: data.id,
            type: "request",
            message: data.message,
            user: data.user,
            read: false,
          },
        ];
        // Store notifications in localStorage
        localStorage.setItem("notifications", JSON.stringify(newNotifications));
        return newNotifications;
      });
    });

    return () => {
      socket.off("newRequest");
    };
  }, [userId]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => {
        if (notif.id === id) {
          const updatedNotif = { ...notif, read: true };
          // Update notifications in localStorage
          localStorage.setItem(
            "notifications",
            JSON.stringify(
              prev.map((notif) => (notif.id === id ? updatedNotif : notif))
            )
          );
          return updatedNotif;
        }
        return notif;
      })
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => {
      const updatedNotifications = prev.filter((notif) => notif.id !== id);
      // Remove notification from localStorage
      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );
      return updatedNotifications;
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case "request":
        return <FiClipboard className="text-blue-500 w-6 h-6" />;
      case "bid":
        return <FiTag className="text-purple-500 w-6 h-6" />;
      case "payment":
        return <FiDollarSign className="text-green-500 w-6 h-6" />;
      default:
        return <FiBell className="w-6 h-6" />;
    }
  };

  // Handle notification click to navigate to request details
  const handleNotificationClick = (requestId) => {
    navigate(`/request/${requestId}`); // Navigate to request details page
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <FiBell /> Mall Owner Notifications
      </h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center mt-4">No new notifications</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`flex items-center justify-between p-3 border rounded-lg ${
                notif.read ? "bg-gray-100" : "bg-cyan-50"
              }`}
              onClick={() => handleNotificationClick(notif.id)} // Add click handler here
            >
              <div className="flex items-center gap-3">
                {getIcon(notif.type)}
                <span
                  className={`${
                    notif.read ? "text-gray-500" : "text-gray-800 font-semibold"
                  }`}
                >
                  {notif.message} -{" "}
                  <span className="text-sm text-gray-400">
                    {notif.user.userName}
                  </span>
                </span>
              </div>
              <div className="flex space-x-3">
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FiCheckCircle />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationSystem;
