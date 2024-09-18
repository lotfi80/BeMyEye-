import mongoose from "mongoose";
import User from "../models/user-model";
import { Post } from "../models/Post";
import { PostImage } from "../models/PostImages";
import Message from "../models/Message";
import connectDB from "../service/mongo-start";

async function clear() {
  await connectDB();
  // await Post.deleteMany({});
  // await PostImage.deleteMany({});
  // await User.updateMany(
  await Message.deleteMany({});
  await User.updateMany(
    {},
    {
      $set: {
        inbox: [],
        sent: [],
      },
    }
    // { $unset: { location: "" } }
  );

  console.log("Fields 'inbox' and 'sent' cleared for all users.");
  await mongoose.disconnect();
}

clear().catch(console.error);
