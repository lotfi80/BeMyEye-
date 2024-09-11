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
          notifications: [],
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
