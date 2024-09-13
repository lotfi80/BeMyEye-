import mongoose, { model, Schema, Document, Types } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  address: string;
  longtitute: string;
  latitute: string;
  location: {
    type: "Point";
    coordinates: number[];
  };
  city: string;
  street: string;
  country: string;
  userid: Types.ObjectId;
  postimage: Types.ObjectId[];
  postcomments: Types.ObjectId[];
  postlikes: Types.ObjectId[];
  barcode?: string;
  postDate: Date;
  category: Types.ObjectId;
  createAt: Date;
}

const PostSchema: Schema<IPost> = new Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    longtitute: { type: String, required: false },
    latitute: { type: String, required: false },
    location: {
      type: {
        type: String,
        enum: ["Point"],
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
    postimage: [{ type: Schema.Types.ObjectId, ref: "PostImage" }],
    postcomments: [{ type: Schema.Types.ObjectId, ref: "PostComment" }],
    postlikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    barcode: { type: String, required: false },
    postDate: { type: Date, default: Date.now },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

PostSchema.index({ location: "2dsphere" });

export const Post = mongoose.model<IPost>("Post", PostSchema);
