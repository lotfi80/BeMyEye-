import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./router/userRouters";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", userRouter);
// app.use("/product", productRouter);
// app.use("/cart", cartRouter);

const port = (process.env.PORT as string) || 3000;
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
