import { createHash } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { sendActivationMessage } from "./mail-service";
import {
  generateToken,
  saveToken,
  removeToken,
  validateRefreshToken,
  findToken,
} from "./token-service";
import User from "../models/user-model";
import { IUser } from "../models/user-model";
import { IUserWithTokens } from "../interfaces/UserWithTokens";
import { IUserPayload } from "../interfaces/UserPayload";
import { ITokenData } from "../interfaces/TokenData";
import { IToken } from "../models/token-model";

export async function findUserByEmail(email: string) {
  return User.findOne({ email });
}
// ***************************
export async function userServiceRegistration(
  email: string,
  password: string
): Promise<IUser | null> {
  const candidate = await User.findOne({ email });
  if (candidate) {
    throw new Error("User already exists");
  }
  const activationLink = uuidv4();
  const sha256 = createHash("sha256");
  const hashPassword: string = sha256.update(password).digest("hex");

  const user: IUser = await User.create({
    email,
    password: hashPassword,
    activationLink: activationLink,
  });

  await sendActivationMessage(
    email,
    `${process.env.CLIENT_URL as string}/activate/${activationLink}`
  );

  return user;
}
// ********************************************************************************************************************
export async function userServiceActivate(
  activationLink: string
): Promise<void> {
  const user = await User.findOne({ activationLink });
  if (!user) {
    throw new Error("Incorrect activation link");
  }
  user.isActivated = true;
  await user.save();
}
//********************************************************************************************************************
export async function userServiceCompleteRegistration(
  id: string,
  firstname: string,
  lastname: string,
  username: string,
  birthdate: Date,
  profileimage: string,
  city: string,
  street: string,
  country: string
): Promise<IUser | void> {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found.");
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
}

// ********************************************************************************************************************
export async function userServiceLogin(
  email: string,
  password: string
): Promise<IUserWithTokens> {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Cannot find user");
  }

  const sha256 = createHash("sha256");
  const hashPassword = sha256.update(password).digest("hex");
  if (hashPassword !== user.password) {
    throw new Error("Invalid password");
  }

  const tokens = await generateToken({
    id: user._id.toString(),
    email: user.email,
    isActivated: user.isActivated,
  });
  await saveToken(user._id.toString(), tokens.refreshToken);

  return {
    ...tokens,
    user: {
      email: user.email,
      id: user._id.toString(),
      isActivated: user.isActivated,
    },
  };
}
// ********************************************************************************************************************
export async function userServiceLogout(refreshToken: string): Promise<void> {
  await removeToken(refreshToken);
}
// ***************************************************************************************
export async function userServiceRefresh(refreshToken: string) {
  if (!refreshToken) {
    throw new Error("User is NOT authorized");
  }

  const userData = (await validateRefreshToken(
    refreshToken
  )) as IUserPayload | null;

  if (!userData) {
    throw new Error("Invalid refresh token");
  }

  const tokenFromDb: IToken | null = await findToken(refreshToken);
  if (!tokenFromDb) {
    throw new Error("Token not found in the database");
  }

  if (!userData || !tokenFromDb) {
    throw new Error("User is not authorized");
  }

  const user: IUser | null = await User.findById((userData as IUserPayload).id);

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.isActivated) {
    throw new Error("User is not activated");
  }

  const tokens: ITokenData = await generateToken({
    id: user._id.toString(),
    email: user.email,
    isActivated: user.isActivated,
  });

  await saveToken(user._id.toString(), tokens.refreshToken);
  return tokens; //kj (userData);
}
// **********************************
