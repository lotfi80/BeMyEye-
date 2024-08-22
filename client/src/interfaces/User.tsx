import mongoose, { Document } from "mongoose";
export interface User extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
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
}
