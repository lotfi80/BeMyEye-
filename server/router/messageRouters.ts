import express from "express";
import sendMessage from "../controllers/message-controller";

const messageRouter = express.Router();

messageRouter.post("/", sendMessage);

export default messageRouter;
