import mongoose, { Schema, model, Document } from 'mongoose';
import { IUser } from './user.js';

export interface IMessage extends Document {
  _id: mongoose.Types.ObjectId;
  sender: IUser;
  recipient: IUser[];
  message: string;
  subject: string;
  attachments: string[];
  isRead: boolean;

  // thread?: mongoose.Types.ObjectId;

  createdAt: Date;
}

const MessageSchema = new Schema(
  {
    sender: { type: mongoose.Schema.ObjectId, ref: 'User' },
    recipient: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    message: { type: String },
    subject: { type: String },
    isRead: { type: Boolean, default: false },
    attachments: [{ type: String }],
    // thread: { type: Schema.ObjectId, ref: "Message" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = model<IMessage>('Message', MessageSchema);
export default Message;
