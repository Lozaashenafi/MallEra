// context/NotificationContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import socket from "../utils/socket";

const NotificationContext = createContext();

export const NotificationProvider = ({ userId, children }) => {
  const [notifications, setNotifications] = useState([]);

  // Setup socket and initial localStorage loading
  useEffect(() => {
    if (!userId) return;

    const stored = localStorage.getItem("notifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    }

    socket.connect();
    const roomId = `user-${userId}`;
    socket.emit("registerUser", roomId);

    const handleNewNotification = (type) => (data) => {
      setNotifications((prev) => {
        const updated = [
          ...prev,
          {
            id: data.id,
            type,
            message: data.message,
            user: data.user,
            read: false,
          },
        ];
        localStorage.setItem("notifications", JSON.stringify(updated));
        return updated;
      });
    };

    socket.on("newRequest", handleNewNotification("request"));
    socket.on("newBid", handleNewNotification("bid"));

    return () => {
      socket.disconnect();
      socket.off("newRequest");
      socket.off("newBid");
    };
  }, [userId]);

  const markAsRead = (id) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, markAsRead, deleteNotification, unreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
