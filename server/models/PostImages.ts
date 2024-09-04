import { model, Schema, Document, Types } from "mongoose";

export interface IPostImage extends Document {
  postid: Types.ObjectId;
  image: string;
  createAt: Date;
}

const PostImageSchema: Schema<IPostImage> = new Schema(
  {
    postid: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    image: { type: String, required: true },
    createAt: { type: Date },
  },
  { timestamps: true }
);

export const PostImage = model<IPostImage>("PostImage", PostImageSchema);
