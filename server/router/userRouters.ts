import express from "express";
import {
  userProfileUpdate,
  userProfileImageUpdate,
  passwordUpdate,
  getUserDataByID,
  deleteUser,
  getUsers,
  getUserDataByField,
} from "../controllers/user-controller";
import { profileImagesUpload } from "../service/multer-service";

const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.get("/user/:id", getUserDataByID);
userRouter.get("/user/:field/:value", getUserDataByField);

userRouter.put("/user/:id", userProfileUpdate);
userRouter.post(
  "/user/:id/upload-image",
  profileImagesUpload.single("profileimage"),
  userProfileImageUpdate
);

userRouter.put("/passwordUpdate/:id", passwordUpdate);
userRouter.delete("/user/:id", deleteUser);

export default userRouter;
