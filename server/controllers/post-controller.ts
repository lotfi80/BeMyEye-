import express from "express";
import { Request, Response, NextFunction } from "express";
import { Post, IPost } from "../models/Post";
import { PostImage, IPostImage } from "../models/PostImages";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, city, street, country, category, userid } =
      req.body;
    const image = req.file;
    const newPost: IPost = await Post.create({
      userid: userid,
      title: title,
      description: description,
      city: city,
      street: street,
      country: country,
    });
    if (image) {
      const newPostImage: IPostImage = await PostImage.create({
        image: image.path,
      });
    }
    res.status(201).json({ message: "Post successfully created", newPost });
    //     res.status(201).json({ message: "PostImage successfully created", newPostImage });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
