import { model, Schema,Document, Types } from "mongoose";

export interface IUser extends Document  {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  birthdate: Date;
  profileimage: string;
  city: string;
  street: string;
  country: string;
  postid: Types.ObjectId[];
  postlikes: Types.ObjectId[];
  hash: string;
  registerDate: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  birthdate: { type: Date, required: false },
  profileimage: { type: String, required: false },
  city: { type: String, required: false },
  street: { type: String, required: false },
  country: { type: String, required: false },
  postid: [{ type: Types.ObjectId, ref: "Post" , required: false}],
  postlikes: [{ type: Types.ObjectId, ref: "Post" , required: false}],
  hash: { type: String, required: true },
  registerDate: { type: Date, default: Date.now },
});

export const User = model<IUser>("User", UserSchema);
