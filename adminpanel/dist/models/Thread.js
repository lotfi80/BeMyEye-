import { Schema, model } from "mongoose";
const ThreadSchema = new Schema({
    title: { type: String },
    messages: [{ type: Schema.ObjectId, ref: "Message" }],
    sender: { type: String, ref: "User" },
    recipients: [{ type: Schema.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
const Thread = model("Thread", ThreadSchema);
export default Thread;
