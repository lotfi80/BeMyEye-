import express, { Request, Response } from "express";
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
  findUserByLink,
} from "../controllers/user-controller";
import { body, validationResult } from "express-validator";
import passport from "passport";
import { generateToken } from "../service/token-service";
import { handleGoogleCallback } from "../service/passport-service";

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
// userRouter.post("/callback", googleauth);

userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  handleGoogleCallback
);

userRouter.get("/user/:link", findUserByLink);
export default userRouter;
