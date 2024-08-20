import { model, Schema, Document, Types } from "mongoose";

export interface IPostComment extends Document {
  postid: Types.ObjectId;
  userid: Types.ObjectId;
  comment: string;
  commentDate: Date;
}

const PostCommentSchema: Schema<IPostComment> = new Schema({
  postid: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  commentDate: { type: Date, default: Date.now },
});

export const PostComment = model<IPostComment>(
  "PostComment",
  PostCommentSchema
);
