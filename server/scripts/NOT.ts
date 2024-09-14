import mongoose from "mongoose";
import User, { IUser } from "../models/user-model";
import connectDB from "../service/mongo-start";
import { Post } from "../models/Post";

async function run() {
  try {
    await connectDB();
    // await User.updateMany(
    //   {},
    //   {
    //     $set: {
    //       notifications: [],
    //     },
    //   }
    // );
    const users = await User.find();
    await Promise.all(
      users.map(async (user) => {
        if (user.followers && user.postid) {
          return Promise.all(
            user.followers.map(async (follower) => {
              await User.findByIdAndUpdate(follower._id, {
                $push: { notifications: { $each: user.postid } },
              });
            })
          );
        }
      })
    );

    console.log("successfully updated");
  } catch (error) {
    console.error("error", error);
  }
  await mongoose.disconnect();
}

run();
