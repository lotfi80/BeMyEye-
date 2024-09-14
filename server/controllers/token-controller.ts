import { Request, Response, NextFunction } from "express";
import { validateAccessToken } from "../service/token-service";
import { validateRefreshToken } from "../service/token-service";
import { generateToken } from "../service/token-service";
import { saveToken } from "../service/token-service";

// *************************************************
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const userData = await validateAccessToken(token);

    if (!userData) {
      const tokensAndID = req.cookies;
      const refreshToken = await tokensAndID.refreshToken;
      console.log("tokenR", refreshToken);

      if (!refreshToken) return res.sendStatus(401);

      const userFromRefreshToken = await validateRefreshToken(refreshToken);
      if (!userFromRefreshToken) return res.sendStatus(403);
      console.log(
        "userFromRefreshToken before generating tokens:",
        userFromRefreshToken
      );
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await generateToken(userFromRefreshToken);
      console.log("4", newAccessToken, newRefreshToken);
      await saveToken(userFromRefreshToken?.id, newRefreshToken);
      res.setHeader("x-access-token", newAccessToken);
      res.cookie("refreshToken", newRefreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      req.user = userFromRefreshToken;
      next();
    } else {
      req.user = userData;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token", error });
  }
};

export default authMiddleware;
