import mongoose, { Schema } from "mongoose";
const PostSchema = new Schema({
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
}, { timestamps: true });
PostSchema.index({ location: "2dsphere" });
export const Post = mongoose.model("Post", PostSchema);
