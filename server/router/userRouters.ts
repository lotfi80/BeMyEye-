import express from "express";
import {
  userProfileUpdate,
  userProfileImageUpdate,
  passwordUpdate,
  getUserDataByID,
  deleteUser,
  getUsers,
  getUserDataByField,
  makeFollower,
  deleteFollower,
  getFollow_,
} from "../controllers/user-controller";
import { profileImagesUpload } from "../service/multer-service";
import authMiddleware from "../controllers/token-controller";

const userRouter = express.Router();
// **************************************************
userRouter.get("/users", authMiddleware, getUsers);
// **************************************************
userRouter.get("/user/:id", authMiddleware, getUserDataByID);
userRouter.put("/user/:id", authMiddleware, userProfileUpdate);
userRouter.post(
  "/user/:id/upload-image",

  profileImagesUpload.single("profileimage"),
  userProfileImageUpdate
);
userRouter.delete("/user/:id", authMiddleware, deleteUser);
// **************************************************
userRouter.post("/user/:id/follow", authMiddleware, makeFollower);
userRouter.put("/user/:id/follow", authMiddleware, deleteFollower);
userRouter.get("/user/:id/follow", authMiddleware, getFollow_);
// **************************************************
userRouter.get("/user/:field/:value", authMiddleware, getUserDataByField);

userRouter.put("/passwordUpdate/:id", authMiddleware, passwordUpdate);

export default userRouter;
