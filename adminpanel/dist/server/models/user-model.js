"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
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
    postid: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Post" }],
    postlikes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Post" }],
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
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    inbox: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Message" }],
    sent: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Message" }],
    notifications: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Post" }],
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
