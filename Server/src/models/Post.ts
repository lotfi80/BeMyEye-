import { model, Schema, Document, Types } from "mongoose";

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
}

const PostSchema: Schema<IPost> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  country: { type: String, required: true },
  userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postimage: [{ type: Schema.Types.ObjectId, ref: "Image" }],
  postcomments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  postlikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  postDate: { type: Date, default: Date.now },
});
export const Post = model<IPost>("Post", PostSchema);
