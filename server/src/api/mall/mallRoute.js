import express from "express";
import {
  registerMall,
  uploadMallImagesMiddleware,
  getMalls,
  getMallById,
} from "./mallController.js";
import { isAdmin } from "../../middleware/auth.js";

const router = express.Router();

router.post("/register", isAdmin, uploadMallImagesMiddleware, registerMall);
router.get("/malls", getMalls);
router.get("/:id", getMallById);

export default router;
