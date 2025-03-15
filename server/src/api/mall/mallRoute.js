import express from "express";
import {
  registerMall,
  uploadMallImagesMiddleware,
  getMalls,
  getMallById,
  updateMall,
  OwnerRegister,
  getMallOwners,
} from "./mallController.js";
import { isAdmin } from "../../middleware/auth.js";

const router = express.Router();

router.post("/register", isAdmin, uploadMallImagesMiddleware, registerMall);
router.post("/owner/register", isAdmin, OwnerRegister);
router.get("/malls", getMalls);
router.get("/owners", getMallOwners);
router.get("/:id", getMallById);
router.put("/update/:id", isAdmin, uploadMallImagesMiddleware, updateMall);

export default router;
