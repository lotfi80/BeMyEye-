import passport from "passport";
import dontenv from "dotenv";
dontenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user-model";
import { Request, Response, NextFunction } from "express";
import { generateToken, saveToken } from "./token-service";
import { ITokenPayload } from "../interfaces/TokenPayload";

passport.use(
  `google`,
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.API_URL}/auth/google/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: Function
    ) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          console.log("User already exists, logging in");
          return done(null, user);
        } else {
          user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            user.googleId = profile.id;
            await user.save();
            console.log("User becam id, logging in");
            return done(null, user);
          } else {
            console.log("User not found");
            return done(null, false, { message: "User not registered" });
          }
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
// **************************************************************************
passport.use(
  `google-register`,
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.API_URL}/auth/google/register/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: Function
    ) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          console.log("User already exists,  cannot register again.");
          return done(null, false, { message: "User already exists" });
        } else {
          user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            user.googleId = profile.id;
            await user.save();
            console.log("User found by email, updated with Google ID.");
            return done(null, user);
          } else {
            const newUser = new User({
              googleId: profile.id,
              email: profile.emails[0].value,
            });
            newUser.isActivated = true;
            await newUser.save();
            console.log("New user registered with Google.");
            return done(null, newUser);
          }
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
// **************************************************************************
export const handleGoogleCallback = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect("/");
  }
  const user = req.user as any;
  const payload: ITokenPayload = {
    id: user._id,
    email: user.email,
    isActivated: user.isActivated,
  };

  try {
    const { accessToken, refreshToken } = await generateToken(payload);
    await saveToken(user._id.toString(), refreshToken);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie("id", user._id.toString(), {
      httpOnly: true,
    });
    res.redirect(`${process.env.CLIENT_URL}/tokenReceive`);
  } catch (error) {
    res.status(500).json({ error: "Error of generateToken" });
  }
};

// **************************************************************************

export default passport;
