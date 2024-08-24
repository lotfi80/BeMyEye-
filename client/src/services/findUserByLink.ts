// import { IUser } from "../interfaces/User";

export const getUserIdByActivationLink = async (
  link: string
): Promise<mongoose.Types.ObjectId | null> => {
  try {
    console.log(link);
    const user: IUser | null = await User.findOne({
      activationLink: link,
    }).exec();
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
