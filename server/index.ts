import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRouter from "./router/userRouters";
import googleRouter from "./router/googleRouters";
import passport from "./service/passport-service";
// import indexRouter from "./router/index";
// import authRouter from "./router/auth";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL as string,
    // origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", userRouter);
app.use("", googleRouter);
app.use(passport.initialize());

const port = (process.env.PORT as string) || 10000;
const mongo_url = process.env.DB_URL as string;

if (!mongo_url) {
  throw new Error("MongoDB URL is not defined in environment variables.");
}

const start = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port= ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
start();
