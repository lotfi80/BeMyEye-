import mongoose, { Schema, Document } from "mongoose";

export interface IToken extends Document {
  user: string;
  refreshToken: string;
}

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

const Token = mongoose.model<IToken>("Token", TokenSchema);
export default Token;
