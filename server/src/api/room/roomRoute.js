import express from "express";
import {
  createRoom,
  getCategory,
  getFloors,
  getRooms,
  updateRoom,
  deleteRoom,
} from "./roomController.js";

const router = express.Router();

router.post("/add", createRoom);
router.get("/category", getCategory);
router.get("/floors", getFloors);
router.get("/list", getRooms);
router.post("/update/:id", updateRoom);
router.post("/delete/:id", deleteRoom);

export default router;
