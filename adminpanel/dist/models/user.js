import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
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
}, { timestamps: true });
const User = mongoose.model("User", UserSchema);
export default User;
