import { Request, Response, NextFunction } from "express";
import {
  userServiceRegistration,
  userServiceLogin,
  userServiceLogout,
  userServiceActivate,
} from "../service/user-service";
import { validationResult } from "express-validator";
import { ITokensWithID } from "../interfaces/ITokensWithID";
import User, { IUser } from "../models/user-model";
import Token from "../models/token-model";
import { Post } from "../models/Post";
import { PostComment } from "../models/PostComments";

import { validateAccessToken } from "../service/token-service";
import { createHash } from "crypto";

// ****************************************************************
export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors });
    }
    const { email, password } = req.body;
    const user = await userServiceRegistration(email, password);

    if (user) {
      return res.status(201).json({ message: "Registration successful" });
    } else {
      return res.status(400).json({ message: "Registration failed" });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// ****************************************************************
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    const responseData: ITokensWithID | null = await userServiceLogin(
      email,
      password
    );

    if (!responseData) {
      return res.status(400).json({ message: "Login failed" });
    }
    const userData: IUser | null = await User.findById(responseData.id);

    if (userData !== null && userData.isActivated) {
      res.cookie("refreshToken", responseData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json({ user: userData, tokens: responseData });
    } else {
      res.status(400).json({ message: "Login failed" });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// ****************************************************************
export const sendDataToClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const tokensAndID = req.cookies;
    if (!tokensAndID.refreshToken) {
      return res.status(400).json({ message: "No refresh token provided" });
    }
    const currentUser: IUser | null = await User.findById(tokensAndID.id);
    const data = { currentUser, tokensAndID };
    res.json(data);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// ****************************************************************
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token provided" });
    }
    console.log("Logout token received:", refreshToken); // Debug
    await userServiceLogout(refreshToken);
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// ****************************************************************
export const activate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const activationLink: string = req.params.link;
    console.log("Activation link von server:", activationLink);
    if (!activationLink) {
      return res.status(400).json({ message: "Invalid activation link" });
    }
    await userServiceActivate(activationLink);
    return res.redirect(process.env.CLIENT_URL as string);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// *****************************************************************
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// *****************************************************************

export async function findUserByLink(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { link } = req.params;
    const user = await User.findOne({ activationLink: link });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user._id);
  } catch (e) {
    console.error(e);
    next(e);
  }
}
// *****************************************************************

export const getUserDataByID = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    return res.json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// ******
// const authHeader = req.headers.authorization;
// if (!authHeader || !authHeader.startsWith('Bearer ')) {
//   return res.status(401).json({ message: "Access token missing or invalid" });
//

// *****************************************************************
// ****************************************************************

export const userProfileUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId: string = req.params.id;
    console.log("server/userId", userId);
    const {
      firstname,
      lastname,
      username,
      birthdate,
      country,
      city,
      street,
      sex,
      profileimage,
      privacy,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !username ||
      !birthdate ||
      !city ||
      !street ||
      !country
    ) {
      return res.status(400).json({
        message: "All fields must be filled to complete the profile.",
      });
    }
    const birthdateDate = new Date(birthdate);

    const currentUser: IUser | null = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          firstname: firstname,
          lastname: lastname,
          username: username,
          birthdate: birthdateDate,
          city: city,
          street: street,
          country: country,
          sex: sex,
          profileimage: profileimage,
          privacy: {
            email: privacy?privacy.email:false,
            firstname: privacy?privacy.firstname:false,
            lastname: privacy?privacy.lastname:false,
            birthdate: privacy?privacy.birthdate:false,
            country: privacy?privacy.country:false,
            city: privacy?privacy.city:false,
          },
        },
      },
      { $upsert: true }
    );
    console.log(currentUser)
    return res.json(currentUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// ***************  ****************************************************
export const userProfileImageUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId: string = req.params.id;
    const profileimage = req.file;

    if (!profileimage) {
      return res.status(400).json({ message: "No image file uploaded." });
    }

    const imagePath = `profileImages/${profileimage.filename}`;
    console.log("server/imagePath", imagePath);
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          profileimage: imagePath,
        },
      },
      { $upsert: true }
    );

    const currentUser: IUser | null = await User.findById(userId);
    return res.json(currentUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// ****************************************************************
export const passwordUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId: string = req.params.id;
    const { oldPassword, password } = req.body;

    const user: IUser | null = await User.findById(userId);
    console.log("server/password", password);
    console.log("server/old password", oldPassword);
    if (!password) {
      return res.status(400).json({
        message: "Password is not confirmed",
      });
    }
    const hashPassword: string = createHash("sha256")
      .update(password)
      .digest("hex");

    console.log("server/hashPassword", hashPassword);

    const hashOldPassword: string = createHash("sha256")
      .update(oldPassword)
      .digest("hex");

    if (user?.hasPassword && hashOldPassword !== user?.password) {
      throw new Error("Invalid old password");
    }

    if (user?.hasPassword && hashPassword === user?.password) {
      console.log("Password is the same");
    }

    // if (!user?.password) {
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          password: hashPassword,
          hasPassword: true,
        },
      },
      { $upsert: true }
    );
    // }

    return res.json(hashPassword);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// *****************************************************
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId: string = req.params.id;
    console.log("server/userId", userId);
    await Post.findByIdAndDelete(userId);
    await PostComment.findByIdAndDelete(userId);
    await Token.findByIdAndDelete(userId);
    await User.findByIdAndDelete(userId);
    return res.json({ message: "User deleted" });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// ****************************************************************
export const getUserDataByField = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const fieldName: string = req.params.field;
    const value: string = req.params.value;
    const query = { [fieldName]: { $regex: `^${value}`, $options: "i" } };
    const users: IUser[] = await User.find(query);
    return res.json(users);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// ****************************************************************
export const makeFollower = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { followingId } = req.body;
    const userId = req.params.id;
    console.log(followingId, userId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { following: followingId } },
      { new: true }
    );
    const updatedFollower = await User.findByIdAndUpdate(
      followingId,
      {
        $push: { followers: userId },
      },
      { new: true }
    );

    return res.json({ message: "Follower added" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error adding follower" });
  }
};
// ****************************************************************
export const deleteFollower = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { followingId } = req.body;
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { following: followingId } },
      { new: true }
    );
    const updatedFollower = await User.findByIdAndUpdate(
      followingId,
      {
        $pull: { followers: userId },
      },
      { new: true }
    );
    console.log("Updated user followers:", updatedFollower);

    return res.json({ message: "Follower deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error deleting follower" });
  }
};
// ******************************************************
export const getFollow_ = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId = req.params.id;
    const userData = await User.findById(userId)
      .populate("followers")
      .populate("following");
    return res.json(userData);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// ******************************************
