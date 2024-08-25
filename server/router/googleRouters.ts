import express, { Request, Response } from "express";
import passport from "passport";
import { handleGoogleCallback } from "../service/passport-service";

const googleRouter = express.Router();

// googleRouter.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
googleRouter.get("/auth/google", (req, res, next) => {
  console.log("Initiating Google authentication process");
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
});

googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  handleGoogleCallback
);

export default googleRouter;
