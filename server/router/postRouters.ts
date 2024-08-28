import express from "express";
import multer from "multer";
// import { getUserPosts } from "../controllers/post";
import { createPost } from "../controllers/post-controller";

const postRouter = express.Router();
const upload = multer({ dest: "uploads/" });
// postRouter.get("/get", getUserPosts);
postRouter.post("/create", upload.single(`image`), createPost);
// postRouter.get("/post/:postID", getPostByPostId);
// postRouter.get("/posts", getAllPosts);
// postRouter.delete("/post/:postID", deletePostById);
// postRouter.put("/post/:postID", updatePostById);

export default postRouter;
