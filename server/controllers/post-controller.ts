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
      barcode,
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
      barcode,
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
      // ////////////////////////////NATH//////////////////////////////////////////
      //////////////fuer Notification den Followers //////////////////////////
      if (user.followers.length > 0) {
        const notPromises = user.followers.map(async (follower) => {
          await User.findByIdAndUpdate(follower._id, {
            $push: { notifications: newPost._id },
          });
        });
        await Promise.all(notPromises);
      }
      ///////////////////////END//////////////////////////////////////////////////
      await user.save();
    }
    res.status(201).json({ message: "Post successfully created", newPost });
    //     res.status(201).json({ message: "PostImage successfully created", newPostImage });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const getFilteredPosts = async (req: Request, res: Response) => {
  try {
    const { lat, long: lng, maxDistance } = req.query;
    console.log(req.query, "test query");

    let query: any = {};
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const categoryId = req.query.categoryId as string;
    const skip = (page - 1) * limit;
    if (categoryId) {
      query = { category: categoryId };
    }

    if (lat && lng && maxDistance) {
      console.log("lat long", lat, lng);
      const maxDistanceInMeters = parseInt(maxDistance as string) * 1000; // convert km to meters

      query.location = {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng as string), parseFloat(lat as string)],
          },

          $maxDistance: maxDistanceInMeters,
        },
      };
    }

    console.log(JSON.stringify(query, null, 2), "test query after");
    // const posts = await Post.find({
    //   location:
    //     { $near :
    //        {
    //          $geometry: { type: "Point",  coordinates: [ 6.7824545, 51.2230411 ] },
    //         //  $minDistance: 1000,
    //          $maxDistance: 200
    //        }
    //     }
    // }
    //   )
    const totalPosts = await Post.find(query);
    // console.log("totalPosts", totalPosts);

    const posts = await Post.find(query)
      .populate("userid")
      .populate("category")
      .populate("postimage")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    delete query.location;
    // const totalPosts = await Post.countDocuments(query);
    // console.log('totalPosts', totalPosts);

    const totalPages = Math.ceil(totalPosts.length / limit);
    res.status(200).send({
      posts,
      currentPage: page,
      totalPages,
      totalPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// ****************************************************************
export const getOnePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const postid: string = req.params.id;
  try {
    const posts = await Post.findById(postid)
      .populate("postcomments")
      .populate("postimage");
    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching posts", e });
  }
};

// ****************************************************************
export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userid: string = req.params.id;
  try {
    const posts = await Post.find({ userid: userid }).populate("postimage");
    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching posts", e });
  }
};
// ****************************************************************
export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postid, userid, content } = req.body;
  console.log("req.body", req.body);
  try {
    const newComment: IPostComment = await PostComment.create({
      postid,
      userid,
      content,
    });
    console.log("newComment", newComment);

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
    const { postid } = req.query;
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
// //////////////////////NATH////////////////////////////
export const getPostsById = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const id: any = req.params.id;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const post = await Post.findById(id)
      .populate("userid")
      .populate("category")
      .populate("postimage");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching post", error });
  }
};
// ****************************************************************
export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  console.log("Fetching posts...");
  try {
    const posts = await Post.find()
      .populate("userid")
      .populate("category")
      .populate("postimage");

    console.log("Posts fetched:", posts);
    if (posts.length === 0) {
      console.log("No posts found");
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};
