import { model, Schema } from "mongoose";
const PostCommentSchema = new Schema({
    postid: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    commentDate: { type: Date, default: Date.now },
}, { timestamps: true });
export const PostComment = model("PostComment", PostCommentSchema);
