import mongoose, { Schema, model } from "mongoose";

export interface IMessage extends Document {
  _id: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId[];
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const MessageSchema = new Schema(
  {
    sender: { type: Schema.ObjectId, ref: "User" },
    recipient: { type: Schema.ObjectId, ref: "User" },
    message: { type: String },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
