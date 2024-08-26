import express from "express";
import multer from "multer";
// import { getUserPosts } from "../controllers/post";
import { createPost } from "../controllers/post-controller";

const postRouter = express.Router();
const upload = multer({ dest: "uploads/" });
// postRouter.get("/get", getUserPosts);
postRouter.post("/create", upload.single(`image`), createPost);

export default postRouter;
