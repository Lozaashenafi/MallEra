import express from "express";
import { registerMall, uploadMallImagesMiddleware } from "./mallController.js";

const router = express.Router();

router.post("/malls/register", uploadMallImagesMiddleware, registerMall);

export default router;
