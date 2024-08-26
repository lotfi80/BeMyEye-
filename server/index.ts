import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./service/mongo-start";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouters";
import googleRouter from "./router/googleRouters";
import categoryRouter from "./router/categories";
import postRouter from "./router/postRouters";
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
app.use("/categories", categoryRouter);
app.use("", googleRouter);
app.use("/posts", postRouter);

app.use(passport.initialize());

const port = (process.env.PORT as string) || 10000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port= ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
start();
