import { Request, Response, NextFunction } from "express";
import {
  userServiceRegistration,
  userServiceLogin,
  userServiceLogout,
  userServiceActivate,
  userServiceRefresh,
} from "../service/user-service";
import { validationResult } from "express-validator";
import { IUserWithTokens } from "../interfaces/UserWithTokens";
import User from "../models/user-model";

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
    // if (userData !== null) {
    //   res.cookie("refreshToken", userData.refreshToken, {
    //     maxAge: 30 * 24 * 60 * 60 * 1000,
    //     httpOnly: true,
    //   });
    //   res.json(userData);
    // } else {
    //   res.status(400).json({ message: "Registration failed" });
    // }
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
    return res
      .status(400)
      .json({ message: "All fields must be filled to complete the profile." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.firstname = firstname;
    user.lastname = lastname;
    user.username = username;
    user.birthdate = birthdate;
    user.profileimage = profileimage;
    user.city = city;
    user.street = street;
    user.country = country;

    await user.save();

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
export const googleauth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { code } = req.body;
    if (!code) {
      return res
        .status(400)
        .json({ message: "Authorization code is required" });
    }
    return res.json("Google auth");
  } catch (e) {
    console.error(e);
    next(e);
  }
};
//сдеалть фетч токенов из гугла в юзер-сервисе
