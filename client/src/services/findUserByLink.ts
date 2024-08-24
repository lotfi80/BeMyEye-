import { IUser } from "../interfaces/User";
import User from "../../../server/models/user-model";
import mongoose from "mongoose";

export const getUserIdByActivationLink = async (
  link: string
): Promise<mongoose.Types.ObjectId | null> => {
  try {
    const user: IUser | null = await User.findOne({
      activationLink: link,
    });
    console.log("User by activation link:", user);

    if (user) {
      return user._id;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error finding user by activation link:", error);
    throw new Error("Failed to find user by activation link");
  }
};
