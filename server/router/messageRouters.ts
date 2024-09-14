import express from "express";
import sendMessage, {
  getUserInbox,
  getUserSent,
  markAsRead,
  deleteMessage,
  attachmentUpload,
} from "../controllers/message-controller";
import { attachmentUploads } from "../service/multer-service";
import authMiddleware from "../controllers/token-controller";

const messageRouter = express.Router();

messageRouter.post("/send/:id", authMiddleware, sendMessage);
messageRouter.get("/user/:id/inbox", authMiddleware, getUserInbox);
messageRouter.get("/user/:id/sent", authMiddleware, getUserSent);
messageRouter.patch("/:id/read", authMiddleware, markAsRead);
messageRouter.delete("/:id/delete", authMiddleware, deleteMessage);

messageRouter.post(
  "/attachment",
  authMiddleware,
  attachmentUploads.single("attachments"),
  attachmentUpload
);

export default messageRouter;
