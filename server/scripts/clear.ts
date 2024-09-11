import mongoose from "mongoose";
import User from "../models/user-model";
import Message from "../models/Message";
import connectDB from "../service/mongo-start";

async function clear() {
  await connectDB();
  await Message.deleteMany({});
  await User.updateMany(
    {},
    {
      $set: {
        inbox: [],
        sent: [],
      },
    }
  );

  console.log("Fields 'inbox' and 'sent' cleared for all users.");
  await mongoose.disconnect();
}

clear().catch(console.error);
