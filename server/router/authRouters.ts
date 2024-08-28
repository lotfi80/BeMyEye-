import express from "express";
import {
  registration,
  login,
  logout,
  activate,
  findUserByLink,
  sendDataToClient,
} from "../controllers/user-controller";
import { body } from "express-validator";

const authRouter = express.Router();
authRouter.post(
  "/registration",
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6, max: 32 })
    .withMessage("Password must be between 6 and 32 characters long"),
  registration
);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/activate/:link", activate);
authRouter.get("/user/:link", findUserByLink);
authRouter.post("/tokenReceive", sendDataToClient);
export default authRouter;
