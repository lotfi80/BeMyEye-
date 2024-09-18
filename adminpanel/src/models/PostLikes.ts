import { model, Schema, Document, Types } from 'mongoose';
import { IPost } from './Post.js';
import { IUser } from './user.js';
export interface IPostLike extends Document {
  postid: IPost;
  userid: IUser;
}

const PostLikeSchema: Schema<IPostLike> = new Schema(
  {
    postid: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const PostLike = model<IPostLike>('PostLike', PostLikeSchema);
