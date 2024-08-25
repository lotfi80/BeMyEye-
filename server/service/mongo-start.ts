import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const connectDB = async () => {
  try {
    if (!MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined");
    }
    await mongoose.connect(MONGODB_URL);
    console.log("connected to mongoDB");
  } catch (err) {
    console.error("Error connecting to mongoDB", err);
    process.exit(1);
  }
};

export default connectDB;
