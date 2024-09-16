import { model, Schema, Document, Types } from 'mongoose';
import { IPost } from './Post.js';
import { IUser } from './user.js';

export interface IPostComment extends Document {
  postid: IPost;
  userid: IUser;
  content: string;
  commentDate: Date;
}

const PostCommentSchema: Schema<IPostComment> = new Schema(
  {
    postid: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    commentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const PostComment = model<IPostComment>('PostComment', PostCommentSchema);
