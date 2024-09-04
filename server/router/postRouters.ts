import express from "express";
import multer from "multer";
import { getPosts } from "../controllers/post-controller";
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
postRouter.get("/", getPosts);

postRouter.post("/comment/create", createComment);
postRouter.get("/comment/get", getComments);
postRouter.put("/comment/update/:id", updateComment);
postRouter.delete("/comment/delete/:id", deleteComment);

export default postRouter;
