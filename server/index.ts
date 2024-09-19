import express from "express";
/*socket : ich muss beobachten und wieder testen ob es rictig eigensetzt*/
import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
/*socket*/
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./service/mongo-start";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouters";
import googleRouter from "./router/googleRouters";
import categoryRouter from "./router/categoriesRouters";
import postRouter from "./router/postRouters";
import mapRouter from "./router/mapRouters";
import authRouter from "./router/authRouters";
import messageRouter from "./router/messageRouters";

import passport from "./service/passport-service";
// import indexRouter from "./router/index";
// import authRouter from "./router/auth";
import fs from "fs";
import path from "path";

const uploadDir = path.join(__dirname, "..", "postImages");
const uploadProfileDir = path.join(__dirname, "..", "profileImages");
const uploadAttachmentDir = path.join(__dirname, "..", "attachments");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const allowedOrigins = [
  process.env.CLIENT_URL as string,
  "http://localhost:5001",
];

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    exposedHeaders: ["x-access-token"],
  })
);

app.use(express.json());
app.use(cookieParser());

// app.use("/users", userRouter);

app.use("/api", userRouter);
app.use("", googleRouter);
app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/map", mapRouter);
app.use("/auth", authRouter);
//Nath: neu Router fuer messaging
app.use("/messages", messageRouter);

app.use("/profileImages", express.static(uploadProfileDir));
app.use("/postImages", express.static(uploadDir));
app.use("/attachments", express.static(uploadAttachmentDir));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use(passport.initialize());

const port = (process.env.PORT as string) || 10000;
/*socket */
const server: Server = new Server(app);
const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  },
});
io.on("connection", (socket) => {
  socket.on("postLike", ({ likes, postId }) => {
    socket.join(`room${postId}`);
    io.to(`room${postId}`).emit("postLike", { likes, postId });
  });
  socket.on("postComment", ({ comments, postId }) => {
    socket.join(`room${postId}`);
    io.to(`room${postId}`).emit("postComment", { comments, postId });
  });
});

/*socket*/
const start = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      /*socket app.listen */
      console.log(`Server is running on port= ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
start();
