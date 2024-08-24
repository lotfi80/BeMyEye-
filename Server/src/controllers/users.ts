import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { signJwt, verifyJwt, signRefreshJWT, verifyRefreshJwt } from "../libs/jwt";

export const register = async (req: Request, res: Response) => {
  const { username, firstname, lastname, email, password } = req.body;
  try {
    const existUser = await User.findOne({ username: username });
    const existEmail = await User.findOne({ email });
    if (existUser) {
      return res.status(400).send({ msg: "Username already exists" });
    }
    if (existEmail) {
      return res.status(400).send({ msg: "Email already exists" });
    }

    // hash the password of the user
    const salt = await bcrypt.genSalt(10);
    const hashThePassword = await bcrypt.hash(password, salt);
    // new user
    const newUser = new User({
      username,
      firstname,
      lastname,
      email,
      hash: hashThePassword,
    });
    await newUser.save();
    res.status(201).send({ msg: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: "Server error", error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    const validatePassword = await bcrypt.compare(password, user.hash);
    if (!validatePassword) {
      throw new Error("Invalid password");
    }
    const token = signJwt(user);
    const refreshToken = signRefreshJWT(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 3600000,
    });
    res.cookie("Refreshjwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        user.refreshToken = refreshToken;
        await user.save();
    const test = verifyJwt(token);
    console.log(token);
    const payload = verifyRefreshJwt(refreshToken);
    console.log(payload);
    // console.log(test);
    if (!test) {
      throw new Error("Invalid token");
    }

    return res.status(200).send({ msg: "User logged in successfully", token, refreshToken });
  } catch (err) {
    return res.status(500).send({ msg: "Server error", error: err });
  }
};

export const getUser = async (req: Request, res: Response) => {
   const {id} = req.params;
   const user = await User.findOne({_id: id});
    if (!user){
         return res.status(404).send({msg: 'User not found'});
    }
    return res.status(200).send({user});
};
