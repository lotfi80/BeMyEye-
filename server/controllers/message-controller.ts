import React from "react";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user-model";
import Message, { IMessage } from "../models/Message";

const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { senderId, message } = req.body;
  try {
    const user = await User.findById(senderId).populate("followers");
    const followersId = user?.followers.map((follower) => follower._id);

    followersId?.map((followerId) => {
      const newMessage = new Message({
        sender: senderId,
        recipient: followerId,
        message,
      });
      newMessage.save();
    });

    console.log("sendMessage: ", req.body);
    return res.status(200).send("Message sent");
  } catch (error) {
    console.error("sendMessage error: ", error);
    return res.status(500).send("Internal server error");
  }
};

export default sendMessage;
