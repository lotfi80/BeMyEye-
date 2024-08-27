import express from "express";
import {
  registration,
  userProfile,
  login,
  logout,
  getUsers,
  getUserDataByID,
  activate,
  findUserByLink,
  findUserIDByToken,
  sendTokensToClient,
} from "../controllers/user-controller";
import { body } from "express-validator";
import multer from "multer";

const userRouter = express.Router();

userRouter.post(
  "/registration",
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6, max: 32 })
    .withMessage("Password must be between 6 and 32 characters long"),
  registration
);
const upload = multer({ dest: "avatar/" });
userRouter.post("/userProfile/:id", upload.single(`profileimage`), userProfile);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/activate/:link", activate);
userRouter.get("/user/:link", findUserByLink);
userRouter.get("/user", findUserIDByToken);
userRouter.post("/get-tokens", sendTokensToClient);
// userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUserDataByID);

export default userRouter;
