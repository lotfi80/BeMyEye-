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
} from "../controllers/user-controller";
import { profileImagesUpload } from "../service/multer-service";

const userRouter = express.Router();

userRouter.get("/users", getUsers);

userRouter.get("/user/:id", getUserDataByID);
userRouter.put("/user/:id", userProfileUpdate);
userRouter.post(
  "/user/:id/upload-image",
  profileImagesUpload.single("profileimage"),
  userProfileImageUpdate
);
userRouter.delete("/user/:id", deleteUser);
userRouter.post("/user/:id/follow", makeFollower);
userRouter.put("/user/:id/follow", deleteFollower);

userRouter.get("/user/:field/:value", getUserDataByField);

userRouter.put("/passwordUpdate/:id", passwordUpdate);

export default userRouter;
