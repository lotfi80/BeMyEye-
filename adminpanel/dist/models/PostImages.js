import { model, Schema } from "mongoose";
const PostImageSchema = new Schema({
    postid: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    image: { type: String, required: true },
    createAt: { type: Date },
}, { timestamps: true });
export const PostImage = model("PostImage", PostImageSchema);
