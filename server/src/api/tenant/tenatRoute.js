import express from "express";
import { TenatRegister, listTenants } from "./tenatController.js";

const router = express.Router();
router.post("/register", TenatRegister);
router.get("/:mallId/list", listTenants);

export default router;
