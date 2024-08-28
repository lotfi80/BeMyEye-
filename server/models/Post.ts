import mongoose, { model, Schema, Document, Types } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  city: string;
  street: string;
  country: string;
  userid: Types.ObjectId;
  postimage: Types.ObjectId[];
  postcomments: Types.ObjectId[];
  postlikes: Types.ObjectId[];
  postDate: Date;
  category: Types.ObjectId;
}

const PostSchema: Schema<IPost> = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  country: { type: String, required: true },
  postimage: [{ type: Schema.Types.ObjectId, ref: "PostImage" }],
  postcomments: [{ type: Schema.Types.ObjectId, ref: "PostComment" }],
  postlikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  postDate: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});
export const Post = mongoose.model<IPost>("Post", PostSchema);
