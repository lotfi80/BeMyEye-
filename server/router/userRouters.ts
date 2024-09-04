import express from "express";
import {
  userProfileUpdate,
  userProfileImageUpdate,
  passwordUpdate,
  getUserDataByID,
  // findUserIDByToken,
  deleteUser,
  getUsers,
} from "../controllers/user-controller";
// import multer from "multer";
import { profileImagesUpload } from "../service/multer-service";

const userRouter = express.Router();

// const upload = multer({ dest: "avatar/" });

// userRouter.get("/user", findUserIDByToken);

userRouter.get("/user/:id", getUserDataByID);
userRouter.put("/user/:id", userProfileUpdate);
userRouter.post(
  "/user/:id/upload-image",
  profileImagesUpload.single("profileimage"),
  userProfileImageUpdate
);

userRouter.put("/passwordUpdate/:id", passwordUpdate);
userRouter.delete("/user/:id", deleteUser);
userRouter.get("/users", getUsers);

export default userRouter;
