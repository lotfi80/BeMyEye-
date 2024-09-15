import mongoose, { Schema, model } from "mongoose";
const MessageSchema = new Schema({
    sender: { type: mongoose.Schema.ObjectId, ref: "User" },
    recipient: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    message: { type: String },
    subject: { type: String },
    isRead: { type: Boolean, default: false },
    attachments: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
const Message = model("Message", MessageSchema);
export default Message;
