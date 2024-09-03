import mongoose from "mongoose";
import User, { IUser } from "../models/user-model";
import connectDB from "../service/mongo-start";

async function run() {
  try {
    await connectDB();
    await User.updateMany(
      {},
      {
        $set: {
          privacy: {
            email: true,
            firstname: true,
            lastname: true,
            birthdate: true,
            country: true,
            city: true,
          },
        },
      }
    );
    console.log("successfully updated");
  } catch (error) {
    console.error("error", error);
  }
  await mongoose.disconnect();
}

run();
