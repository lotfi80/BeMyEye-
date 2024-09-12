import express from "express";
import multer from "multer";
import { getFilteredPosts } from "../controllers/post-controller";
import { createPost } from "../controllers/post-controller";
import { getUserPosts } from "../controllers/post-controller";
import {
  getOnePost,
  createComment,
  getComments,
  updateComment,
  deleteComment,
  getPostsById,
  //   deleteComment,
} from "../controllers/post-controller";
import { imagesUpload } from "../service/multer-service";
import authMiddleware from "../controllers/token-controller";

const postRouter = express.Router();
// const upload = multer({ dest: "uploads/" });
postRouter.get("/:id", authMiddleware, getOnePost);
postRouter.get("/get/:id", authMiddleware, getUserPosts);
postRouter.post("/create", imagesUpload.single("postImages"), createPost);
postRouter.get("/", getFilteredPosts);
postRouter.post("/comment/create", authMiddleware, createComment);
postRouter.get("/comment/get", authMiddleware, getComments);
postRouter.put("/comment/update/:id", authMiddleware, updateComment);

// /////////////////////////NATH/////////////
postRouter.get("/:id", authMiddleware, getPostsById);
export default postRouter;
