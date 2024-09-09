import express from "express";
import multer from "multer";
import { getFilteredPosts } from "../controllers/post-controller";
// import { getUserPosts } from "../controllers/post";
import { createPost } from "../controllers/post-controller";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
  //   deleteComment,
} from "../controllers/post-controller";
import { imagesUpload } from "../service/multer-service";

const postRouter = express.Router();
// const upload = multer({ dest: "uploads/" });
// postRouter.get("/get", getUserPosts);
postRouter.post("/create", imagesUpload.single("postImages"), createPost);
postRouter.get("/", getFilteredPosts);
postRouter.post("/comment/create", createComment);
postRouter.post("/comment/get", getComments);
postRouter.put("/comment/update/:id", updateComment);

export default postRouter;
