import { Request, Response, NextFunction } from "express";
import { Post, IPost } from "../models/Post";
import { PostComment, IPostComment } from "../models/PostComments";
import { PostImage, IPostImage } from "../models/PostImages";
import User from "../models/user-model";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      address,
      latitute,
      longtitute,
      category,
      userid,
    } = req.body;
    console.log(userid, "test ", req.body);
    const image = req.file;

    const newPost: IPost = await Post.create({
      userid,
      title,
      description,
      address,
      latitute,
      longtitute,
      location: {
        type: "Point",
        coordinates: [longtitute, latitute],
      },
      category,
      postimage: [],
    });

    if (image) {
      const newPostImage: IPostImage = await PostImage.create({
        image: image.path,
        postid: newPost._id,
      });

      await Post.findByIdAndUpdate(newPost._id, {
        $push: { postimage: newPostImage._id },
      });
    }

    const user = await User.findById(userid);
    if (user) {
      user.postid.push(newPost._id as any);
      await user.save();
    }

    res.status(201).json({ message: "Post successfully created", newPost });
    //     res.status(201).json({ message: "PostImage successfully created", newPostImage });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// ****************************************************************
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const products = await Product.find({
  //   location: {
  //       $near: {
  //           $geometry: {
  //               type: "Point",
  //               coordinates: [parseFloat(lng), parseFloat(lat)]
  //           },
  //           $maxDistance: 5000
  //       }
  //   }
  // });
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;

    const skip = (page - 1) * limit;
    const userid = req.query.userid;
    const posts = userid
      ? await Post.find({ userid: userid })
          .populate("userid")
          .populate("category")
          .populate("postimage")
      : await Post.find()
          .populate("userid")
          .populate("category")
          .populate("postimage")
          .skip(skip)
          .limit(limit)
          .sort({ postDate: -1 });

    const totalPosts = await Post.countDocuments();

    const totalPages = Math.ceil(totalPosts / limit);
    res.status(200).send({
      posts,
      currentPage: page,
      totalPages,
      totalPosts,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// ****************************************************************
export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postid, userid, content } = req.body;
  try {
    const newComment: IPostComment = await PostComment.create({
      postid,
      userid,
      content,
    });
    console.log(newComment);

    const post = await Post.findByIdAndUpdate(postid, {
      $push: { postcomments: newComment._id },
    });

    res
      .status(201)
      .json({ message: "Comment successfully created", newComment });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postid } = req.body;
    const comments = await PostComment.find({ postid: postid }).populate(
      "userid"
    );
    res.status(200).json(comments);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const comment = await PostComment.findByIdAndUpdate(
      {
        _id: id,
      },
      { $set: { content: content } }
    );

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const comment = await PostComment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted successfully", comment });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
