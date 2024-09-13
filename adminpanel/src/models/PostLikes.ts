import { model, Schema, Document, Types } from "mongoose";

export interface IPostLike extends Document {
  postid: Types.ObjectId;
  userid: Types.ObjectId;
}

const PostLikeSchema: Schema<IPostLike> = new Schema({
  postid: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const PostLike = model<IPostLike>("PostLike", PostLikeSchema);
