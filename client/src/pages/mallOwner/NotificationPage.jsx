import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiBell,
  FiCheckCircle,
  FiTrash2,
  FiDollarSign,
  FiTag,
  FiClipboard,
  FiMessageCircle,
  FiAlertTriangle,
  FiInfo,
} from "react-icons/fi";
import { getNotifications } from "../../api/notification";
import { useAuth } from "../../context/AuthContext";

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const { userData } = useAuth();
  const userId = userData.userId;

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const res = await getNotifications(userId);
        setNotifications(res);
        localStorage.setItem("notifications", JSON.stringify(data));
      } catch (error) {
        console.error("❌ Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => {
        if (notif.id === id) {
          const updatedNotif = { ...notif, read: true };
          localStorage.setItem(
            "notifications",
            JSON.stringify(prev.map((n) => (n.id === id ? updatedNotif : n)))
          );
          return updatedNotif;
        }
        return notif;
      })
    );
    // Optionally: send update to backend here
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => {
      const updated = prev.filter((notif) => notif.id !== id);
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
    // Optionally: send delete request to backend here
  };

  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case "request":
        return <FiClipboard className="text-blue-500 w-6 h-6" />;
      case "bid":
        return <FiTag className="text-purple-500 w-6 h-6" />;
      case "payment":
        return <FiDollarSign className="text-green-500 w-6 h-6" />;
      case "message":
        return <FiMessageCircle className="text-cyan-500 w-6 h-6" />;
      case "alert":
        return <FiAlertTriangle className="text-red-500 w-6 h-6" />;
      case "system":
        return <FiInfo className="text-gray-600 w-6 h-6" />;
      default:
        return <FiBell className="w-6 h-6" />;
    }
  };

  const handleNotificationClick = (event) => {
    event.stopPropagation(); // Prevent navigation
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <FiBell />
        Notifications
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
              onClick={handleNotificationClick}
            >
              <div className="flex items-center gap-3">
                {getIcon(notif.type)}
                <span
                  className={`${
                    notif.read ? "text-gray-500" : "text-gray-800 font-semibold"
                  }`}
                >
                  {notif.message}
                </span>
              </div>
              <div className="flex space-x-3">
                {!notif.read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(notif.id);
                    }}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FiCheckCircle />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notif.id);
                  }}
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
