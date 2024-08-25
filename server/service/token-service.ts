import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import Token from "../models/token-model";
import { ITokenPayload } from "../interfaces/TokenPayload";
import { ConnectionClosedEvent } from "mongodb";

export async function generateToken(payload: ITokenPayload) {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "30m",
    }
  );
  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "30d",
    }
  );

  return { accessToken, refreshToken };
}
// ***************************************************************
export async function saveToken(userId: string, refreshToken: string) {
  const tokenData = await Token.findOne({ user: userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = Token.create({ user: userId, refreshToken });
  return token;
}
// ***************************************************************
export async function removeToken(refreshToken: string): Promise<void> {
  console.log("Removing token:", refreshToken); // debug
  const result = await Token.deleteOne({ refreshToken: refreshToken });
  console.log("Delete result:", result); // debug
}
// ***************************************************************
export async function findToken(refreshToken: string) {
  console.log("in tokenservice", refreshToken);
  const tokenData = await Token.findOne({ refreshToken });
  return tokenData;
}
// ***************************************************************
export async function validateAccessToken(token: string) {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    return userData;
  } catch (e) {
    console.log(e);
  }
}
// ***************************************************************
export async function validateRefreshToken(token: string) {
  try {
    const userData = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    );
    return userData;
  } catch (e) {
    console.log(e);
  }
}
