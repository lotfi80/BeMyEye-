import mongoose, { model, Schema, Document, Types } from 'mongoose';
import { IUser } from './user.js';
import { IPostImage } from './PostImages.js';
import { IPostComment } from './PostComments.js';
import { IPostLike } from './PostLikes.js';
import { ICategory } from './Categories.js';

export interface IPost extends Document {
  title: string;
  description: string;
  address: string;
  longtitute: string;
  latitute: string;
  location: {
    type: 'Point';
    coordinates: number[];
  };
  city: string;
  street: string;
  country: string;
  userid: IUser;
  postimage: IPostImage[];
  postcomments: IPostComment[];
  postlikes: IPostLike[];
  barcode?: string;
  postDate: Date;
  category: ICategory;
  createAt: Date;
}

const PostSchema: Schema<IPost> = new Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    longtitute: { type: String, required: false },
    latitute: { type: String, required: false },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    city: { type: String, required: false },
    street: { type: String, required: false },
    country: { type: String, required: false },
    postimage: [{ type: Schema.Types.ObjectId, ref: 'PostImage' }],
    postcomments: [{ type: Schema.Types.ObjectId, ref: 'PostComment' }],
    postlikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    barcode: { type: String, required: false },
    postDate: { type: Date, default: Date.now },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true }
);

PostSchema.index({ location: '2dsphere' });

export const Post = mongoose.model<IPost>('Post', PostSchema);
