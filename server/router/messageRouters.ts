import express from "express";
import sendMessage, {
  getUserInbox,
  getUserSent,
  markAsRead,
  deleteMessage,
} from "../controllers/message-controller";

const messageRouter = express.Router();

messageRouter.post("/send/:id", sendMessage);
messageRouter.get("/user/:id/inbox", getUserInbox);
messageRouter.get("/user/:id/sent", getUserSent);
messageRouter.patch("/:id/read", markAsRead);
messageRouter.delete("/:id/delete", deleteMessage);

export default messageRouter;
