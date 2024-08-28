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
import { validateAccessToken } from "../service/token-service";

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
    if (!activationLink) {
      return res.status(400).json({ message: "Invalid activation link" });
    }
    await userServiceActivate(activationLink);
    return res.redirect(process.env.CLIENT_URL || "/");
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
    return res.json(["123", "456"]);
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
// ******************************************

export const getUserDataByID = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId = req.params.id;
    return res.json(userId);
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
    const { firstname, lastname, username, birthdate, country, city, street } =
      req.body;

    // const profileimage = req.file;

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

    await User.updateOne(
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
        },
      },
      { $upsert: true }
    );

    // if (profileimage) {
    //   await User.updateOne(
    //     { _id: userId },
    //     {
    //       profileimage: profileimage.path,
    //     },
    //     { $upsert: true }
    //   );
    // }
    const currentUser: IUser | null = await User.findById(userId);
    return res.json(currentUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
