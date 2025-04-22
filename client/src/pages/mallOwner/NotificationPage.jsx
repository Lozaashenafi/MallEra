import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import {
  FiBell,
  FiCheckCircle,
  FiTrash2,
  FiDollarSign,
  FiTag,
  FiClipboard,
} from "react-icons/fi";
import socket from "../../utils/socket";

const NotificationSystem = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!userId) return;

    socket.connect();
    console.log("🔌 Connecting socket...");

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);

      const roomId = `user-${userId}`;
      socket.emit("registerUser", roomId);
      console.log(`📡 Registered as ${roomId}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [userId]);

  // Fetch notifications from localStorage when component is mounted
  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }

    if (userId) {
      socket.emit("registerUser", userId);
    }

    const handleNewNotification = (type) => (data) => {
      setNotifications((prev) => {
        const newNotifications = [
          ...prev,
          {
            id: data.id,
            type: type,
            message: data.message,
            user: data.user,
            read: false,
          },
        ];
        localStorage.setItem("notifications", JSON.stringify(newNotifications));
        return newNotifications;
      });
    };

    socket.on("newRequest", handleNewNotification("request"));
    socket.on("newBid", handleNewNotification("bid"));

    return () => {
      socket.off("newRequest");
      socket.off("newBid"); // clean this too
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

  // Prevent navigating to the notification detail page
  const handleNotificationClick = (event) => {
    event.stopPropagation(); // Prevent click event from propagating
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
              onClick={handleNotificationClick} // Add the click handler here
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
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click propagation
                      markAsRead(notif.id);
                    }}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FiCheckCircle />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click propagation
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
