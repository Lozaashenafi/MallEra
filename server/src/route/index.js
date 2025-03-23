import express from "express";
import authRoutes from "../api/auth/authRoute.js"; // Add `.js` extension
import mallRoute from "../api/mall/mallRoute.js"; // Add `.js` extension
import roomRoute from "../api/room/roomRoute.js";
import tenantRoute from "../api/tenant/tenatRoute.js";
import rentRoute from "../api/rent/rentRoute.js";
import paymentRoute from "../api/payment/paymentRoute.js";
const router = express.Router();

// Auth routes
router.use("/auth", authRoutes);
router.use("/mall", mallRoute);
router.use("/room", roomRoute);
router.use("/tenant", tenantRoute);
router.use("/rent", rentRoute);
router.use("/payment", paymentRoute);

export default router;
