import passport from "passport";
import dontenv from "dotenv";
dontenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user-model";
import { Request, Response, NextFunction } from "express";
import { generateToken } from "./token-service";
import { ITokenPayload } from "../interfaces/TokenPayload";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.CLIENT_URL as string}/auth/google/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: Function
    ) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        console.log("User already exists");
        return done(null, existingUser);
      }

      // // Если пользователь новый, создайте его в базе
      // const newUser = await new User({
      //   googleId: profile.id,
      //   email: profile.emails[0].value,
      //   name: profile.displayName,
      // }).save();

      // done(null, newUser);
    }
  )
);
export const handleGoogleCallback = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect("/");
  }
  const user = req.user as any;
  const payload: ITokenPayload = {
    id: user.id,
    email: user.email,
    isActivated: user.isActivated,
  };

  const { accessToken, refreshToken } = await generateToken(payload);
  res.json({ accessToken, refreshToken });
};

// Сериализация пользователя
passport.serializeUser((user: any, done: Function) => {
  done(null, user.id);
});

// Десериализация пользователя
passport.deserializeUser(async (id: string, done: Function) => {
  const user = await User.findById(id);
  done(null, user);
});
export default passport;
