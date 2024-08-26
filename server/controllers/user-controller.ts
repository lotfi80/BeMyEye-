import { Request, Response, NextFunction } from "express";
import {
  userServiceRegistration,
  userServiceCompleteRegistration,
  userServiceLogin,
  userServiceLogout,
  userServiceActivate,
  userServiceRefresh,
} from "../service/user-service";
import { validationResult } from "express-validator";
import { IUserWithTokens } from "../interfaces/UserWithTokens";
import User from "../models/user-model";
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
export const completeRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId: string = req.params.id;
    const {
      firstname,
      lastname,
      username,
      birthdate,
      profileimage,
      city,
      street,
      country,
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
    await userServiceCompleteRegistration(
      userId,
      firstname,
      lastname,
      username,
      birthdate,
      profileimage,
      city,
      street,
      country
    );
    return res.status(200).json({ message: "Profile completed successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
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
    const userData: IUserWithTokens | null = await userServiceLogin(
      email,
      password
    );
    if (userData !== null && userData.user.isActivated) {
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(userData);
    } else {
      res.status(400).json({ message: "Login failed" });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// ****************************************************************
// export const getTokens = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response | void> => {
//   try {
//     const { refreshToken } = req.cookies;
//     if (!refreshToken) {
//       return res.status(400).json({ message: "No refresh token provided" });
//     }
//     const userData = await userServiceRefresh(refreshToken);
//     res.json(userData);
//   } catch (e) {
//     console.error(e);
//     next(e);
//   }
// };
// ****************************************************************
export const sendTokensToClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const tokens = req.cookies;
    if (!tokens.refreshToken) {
      return res.status(400).json({ message: "No refresh token provided" });
    }
    res.json(tokens);
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
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await userServiceRefresh(refreshToken);

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
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
export const getUser = async (
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
export async function findUserIDByToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token missing" });
  }
  const accessToken: string = authHeader.split(" ")[1];

  try {
    const data = await validateAccessToken(accessToken);
    if (data === null) {
      console.error("Token is invalid or returned as a string");
      return res.status(400).json({ message: "Invalid token" });
    }

    const userId = data.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }
    res.json({ userId });
  } catch (e) {
    console.error(e);
    next(e);
  }
}

// ******
// const authHeader = req.headers.authorization;
// if (!authHeader || !authHeader.startsWith('Bearer ')) {
//   return res.status(401).json({ message: "Access token missing or invalid" });
//
