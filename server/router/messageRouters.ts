import express from "express";
import sendMessage, {
  getUserInbox,
  getUserSent,
  markAsRead,
  deleteMessage,
  attachmentUpload,
} from "../controllers/message-controller";
import { attachmentUploads } from "../service/multer-service";

const messageRouter = express.Router();

messageRouter.post("/send/:id", sendMessage);
messageRouter.get("/user/:id/inbox", getUserInbox);
messageRouter.get("/user/:id/sent", getUserSent);
messageRouter.patch("/:id/read", markAsRead);
messageRouter.delete("/:id/delete", deleteMessage);

messageRouter.post(
  "/attachment",
  attachmentUploads.single("attachments"),
  attachmentUpload
);

export default messageRouter;
