import express from "express";
import authRoutes from "../api/auth/authRounte.js"; // Add `.js` extension

const router = express.Router();

// Auth routes
router.use("/auth", authRoutes);

export default router;
