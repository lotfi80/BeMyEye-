import express from "express";
import {
  registration,
  completeRegistration,
  login,
  logout,
  refresh,
  getUsers,
  getUser,
  activate,
  googleauth,
} from "../controllers/user-controller";
import { body, validationResult } from "express-validator";

const userRouter = express.Router();

userRouter.post(
  "/registration",
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6, max: 32 })
    .withMessage("Password must be between 6 and 32 characters long"),
  registration
);
userRouter.post("/complete-registration/:id", completeRegistration);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/activate/:link", activate);
userRouter.get("/refresh", refresh);
userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUser);
userRouter.post("/callback", googleauth);

export default userRouter;
