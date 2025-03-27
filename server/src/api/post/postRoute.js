import express from "express";
import {
  addPosts,
  getPosts,
  postDetail,
  uploadPostImages,
} from "./postController.js";

const router = express.Router();

router.post("/add", uploadPostImages, addPosts);
router.post("/:id", postDetail);
router.post("/get", getPosts);

export default router;
