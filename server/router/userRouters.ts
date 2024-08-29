import express from "express";
import {
  userProfileUpdate,
  passwordUpdate,
  getUserDataByID,
  // findUserIDByToken,
  // deleteUser,// wir brauchen das
  getUsers,
} from "../controllers/user-controller";
// import multer from "multer";
import { profileImagesUpload } from "../service/multer-service";

const userRouter = express.Router();

// const upload = multer({ dest: "avatar/" });

// userRouter.get("/user", findUserIDByToken);

userRouter.get("/user/:id", getUserDataByID);
userRouter.put(
  "/user/:id",
  profileImagesUpload.single(`profileimages`),
  userProfileUpdate
);
userRouter.put("/passwordUpdate/:id", passwordUpdate);
// userRouter.delete("/user/:id", deleteUser); // wir brauchen das
userRouter.get("/users", getUsers);

export default userRouter;
