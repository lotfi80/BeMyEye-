import mongoose, { Schema } from "mongoose";
const TokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Token = mongoose.model("Token", TokenSchema);
export default Token;
