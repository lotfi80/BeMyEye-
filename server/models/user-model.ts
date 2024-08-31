import mongoose, { Schema, model } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  hasPassword: boolean;
  isActivated: boolean;
  activationLink?: string | null;
  firstname: string;
  lastname: string;
  username: string;
  birthdate: Date;
  profileimage: string;
  city: string;
  street: string;
  country: string;
  postid: mongoose.Types.ObjectId[];
  // postlikes: mongoose.Types.ObjectId[];
  hash: string;
  registerDate: Date;
  googleId: string;
  sex: number;
}

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  hasPassword: { type: Boolean },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  },
  googleId: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String },
  birthdate: { type: Date },
  profileimage: { type: String },
  city: { type: String },
  street: { type: String },
  country: { type: String },
  postid: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  postlikes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  hash: { type: String, default: null },
  registerDate: { type: Date, default: Date.now },
  sex: { type: Number },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
