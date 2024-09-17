import express from "express";
import multer from "multer";
import { getFilteredPosts } from "../controllers/post-controller";
import { createPost } from "../controllers/post-controller";
import { getUserPosts } from "../controllers/post-controller";
import { deletePost, updatePost } from "../controllers/post-controller";

import {
  getOnePost,
  createComment,
  getComments,
  updateComment,
  deleteComment,
  getLikesByPOst,
  togglePostLike,
  getPostsById,
  getAllPosts,
  //   deleteComment,
} from "../controllers/post-controller";
import { imagesUpload } from "../service/multer-service";
import authMiddleware from "../controllers/token-controller";

const postRouter = express.Router();
// const upload = multer({ dest: "uploads/" });
postRouter.get("/:id", /*authMiddleware*/ getOnePost);
postRouter.get("/get/:id", authMiddleware, getUserPosts);
postRouter.post("/create", imagesUpload.single("postImages"), createPost);
postRouter.get("/", getFilteredPosts);
postRouter.post("/comment/create", createComment);
postRouter.get("/comment/get", getComments);
postRouter.put("/comment/update/:id", updateComment);
postRouter.get("/:id/like", getLikesByPOst);
postRouter.post("/like", togglePostLike);
postRouter.delete("/:postId", deletePost);
postRouter.put("/:postId", updatePost);

postRouter.get("/:id", authMiddleware, getPostsById);

// /////////////////////////NATH/////////////
postRouter.get("/getby/:id", authMiddleware, getPostsById);
postRouter.get("/getall/posts", authMiddleware, getAllPosts);
export default postRouter;
