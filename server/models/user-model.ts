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
  postlikes: mongoose.Types.ObjectId[];
  hash: string;
  registerDate: Date;
  googleId: string;
  sex: number;
  privacy: {
    email: boolean;
    firstname: boolean;
    lastname: boolean;
    birthdate: boolean;
    country: boolean;
    city: boolean;
  };
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  inbox: mongoose.Types.ObjectId[];
  sent: mongoose.Types.ObjectId[];
  notifications: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema(
  {
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
    // postlikes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    postlikes: [{ type: Schema.Types.ObjectId, ref: "PostLike" }], 

    hash: { type: String, default: null },
    sex: { type: Number },
    registerDate: { type: Date, default: Date.now },
    privacy: {
      email: { type: Boolean },
      firstname: { type: Boolean },
      lastname: { type: Boolean },
      birthdate: { type: Boolean },
      country: { type: Boolean },
      city: { type: Boolean },
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    inbox: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    sent: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    notifications: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
