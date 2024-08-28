import { createHash } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { sendActivationMessage } from "./mail-service";
import { generateToken, saveToken, removeToken } from "./token-service";
import User from "../models/user-model";
import { IUser } from "../models/user-model";
import { ITokensWithID } from "../interfaces/ITokensWithID";

// *********************************************************************************************
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
): Promise<ITokensWithID> {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Cannot find user");
  }

  const sha256 = createHash("sha256");
  const hashPassword = sha256.update(password).digest("hex");
  if (hashPassword !== user.password) {
    throw new Error("Invalid password");
  }
  // ----------- muss user ein Nachricht bekommen, dass er nicht aktiviert ist
  if (!user.isActivated) {
    console.log("User is not activated");
    throw new Error("User is not activated");
  }
  // -------------------
  const tokens = await generateToken({
    id: user._id.toString(),
    email: user.email,
    isActivated: user.isActivated,
  });
  console.log(tokens);

  await saveToken(user._id.toString(), tokens.refreshToken);
  return {
    ...tokens,
    id: user.id,
  };
}
// ********************************************************************************************************************
export async function userServiceLogout(refreshToken: string): Promise<void> {
  await removeToken(refreshToken);
}

// **********************************
export async function passwordUpdate(password: string): Promise<string> {
  const sha256 = createHash("sha256");
  const hashPassword: string = sha256.update(password).digest("hex");

  return hashPassword;
}
