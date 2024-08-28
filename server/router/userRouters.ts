import express from "express";
import {
  userProfile,
  getUserDataByID,
  // findUserIDByToken,
  // deleteUser,// wir brauchen das
  getUsers,
} from "../controllers/user-controller";

import multer from "multer";

const userRouter = express.Router();

const upload = multer({ dest: "avatar/" });

// userRouter.get("/user", findUserIDByToken);

userRouter.get("/user/:id", getUserDataByID);
userRouter.post("/user/:id", upload.single(`profileimage`), userProfile);
// userRouter.delete("/user/:id", deleteUser); // wir brauchen das
userRouter.get("/users", getUsers);

export default userRouter;
