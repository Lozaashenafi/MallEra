import React, { useState } from "react";
import {
  FiBell,
  FiCheckCircle,
  FiTrash2,
  FiDollarSign,
  FiTag,
  FiClipboard,
} from "react-icons/fi";

function NotificationPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "request",
      message: "New shop request from XYZ Retail.",
      read: false,
    },
    {
      id: 2,
      type: "bid",
      message: "New lease bid from ABC Stores.",
      read: false,
    },
    {
      id: 3,
      type: "payment",
      message: "Rent payment received from Store #12.",
      read: true,
    },
    {
      id: 4,
      type: "request",
      message: "Maintenance request submitted.",
      read: false,
    },
    {
      id: 5,
      type: "payment",
      message: "Pending invoice for Store #45.",
      read: false,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "request":
        return <FiClipboard className="text-blue-500" />;
      case "bid":
        return <FiTag className="text-purple-500" />;
      case "payment":
        return <FiDollarSign className="text-green-500" />;
      default:
        return <FiBell />;
    }
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
}

export default NotificationPage;
