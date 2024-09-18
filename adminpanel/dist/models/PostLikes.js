import { model, Schema } from "mongoose";
const PostLikeSchema = new Schema({
    postid: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
export const PostLike = model("PostLike", PostLikeSchema);
