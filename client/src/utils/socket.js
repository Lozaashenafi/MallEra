// utils/socket.js
import { io } from "socket.io-client";

// Create and export a single socket instance
const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
