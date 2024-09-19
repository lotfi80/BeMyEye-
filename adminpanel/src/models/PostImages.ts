import { model, Schema, Document, Types } from 'mongoose';
import { IPost } from './Post.js';

export interface IPostImage extends Document {
  postid: IPost;
  image: string;
  createAt: Date;
}

const PostImageSchema: Schema<IPostImage> = new Schema(
  {
    postid: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    image: { type: String, required: true },
    createAt: { type: Date },
  },
  { timestamps: true }
);

export const PostImage = model<IPostImage>('PostImage', PostImageSchema);
