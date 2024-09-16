import mongoose, { Schema, model } from "mongoose";

export interface Thread {
  _id: mongoose.Types.ObjectId;
  title: string;
  sender: string;
  recipients: string[];
  messages: string[];
  createdAt: Date;
}

const ThreadSchema = new Schema(
  {
    title: { type: String },
    messages: [{ type: Schema.ObjectId, ref: "Message" }],
    sender: { type: String, ref: "User" },
    recipients: [{ type: Schema.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Thread = model<Thread>("Thread", ThreadSchema);
export default Thread;
