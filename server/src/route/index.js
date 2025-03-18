import express from "express";
import authRoutes from "../api/auth/authRoute.js"; // Add `.js` extension
import mallRoute from "../api/mall/mallRoute.js"; // Add `.js` extension
import roomRoute from "../api/room/roomRoute.js";
const router = express.Router();

// Auth routes
router.use("/auth", authRoutes);
router.use("/mall", mallRoute);
router.use("/room", roomRoute);

export default router;
