import React from "react";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user-model";
import Message, { IMessage } from "../models/Message";

const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const senderId = req.params.id;
  const { recipients, message, subject } = req.body;

  if (!Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).send("Recipients must be a non-empty array.");
  }

  try {
    const newMessage = new Message({
      sender: senderId,
      recipient: recipients,
      message: message,
      subject: subject,
      isRead: false,
    });
    newMessage.save();

    const sender = await User.findById(senderId);
    sender?.sent.push(newMessage._id as any);
    await sender?.save();

    for (const recipientId of recipients) {
      const recipient = await User.findById(recipientId);
      if (recipient) {
        recipient.inbox.push(newMessage._id);
        await recipient.save();
      }
    }

    return res.status(200).json(newMessage);
  } catch (error) {
    console.error("sendMessage error: ", error);
    return res.status(500).send("Internal server error");
  }
};

export default sendMessage;
// ****************************************************************
export const getUserInbox = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate("inbox");
    const inbox = user?.inbox;
    return res.status(200).json(inbox);
  } catch (err) {
    console.error("getUserInbox error: ", err);
    return res.status(500).send("Internal server error");
  }
};
// ****************************************************************
export const getUserSent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate("sent");
    const sent = user?.sent;
    return res.status(200).json(sent);
  } catch (err) {
    console.error("getUserSent error: ", err);
    return res.status(500).send("Internal server error");
  }
};
// ****************************************************************
export const markAsRead = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const messageId = req.params.id;
  try {
    const message = await Message.findById(messageId);
    if (message) {
      message.isRead = true;
      await message.save();
      return res.status(200).json(message);
    }
    return res.status(404).send("Message not found");
  } catch (err) {
    console.error("markAsRead error: ", err);
    return res.status(500).send("Internal server error");
  }
};
// ****************************************************************
export const deleteMessage = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const messageId = req.params.id;
  try {
    const message = await Message.findByIdAndDelete(messageId);
    if (!message) {
      return res.status(404).send("Message not found");
    }
    await User.findByIdAndUpdate(message.sender, {
      $pull: { sent: messageId },
    });

    await Promise.all(
      message.recipient.map(async (recipientId) => {
        await User.findByIdAndUpdate(recipientId, {
          $pull: { inbox: messageId },
        });
      })
    );

    return res.status(200).json("message successfully deleted");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};
