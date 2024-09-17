import { Request, Response, NextFunction } from "express";
import { Post, IPost } from "../models/Post";
import { PostComment, IPostComment } from "../models/PostComments";
import { PostImage, IPostImage } from "../models/PostImages";
import User from "../models/user-model";
import { PostLike } from "../models/PostLikes";

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
    if (
      !title ||
      !description /*|| !latitute || !longtitute */ ||
      !category ||
      !userid
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    if (!address || !latitute || !longtitute) {
      return res
        .status(400)
        .json({ message: "Please enter a valid street name and city" });
    }
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
    if (!image) {
      return res.status(400).json({ message: "Please upload an image" });
    } else if (image) {
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
    console.error(`Error creating post: ${e}`);
    next(e);
  }
};
// ****************************************************************
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    console.log("Attempting to delete post with ID:", postId);

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await PostImage.deleteMany({ postid: postId });

    await User.findByIdAndUpdate(post.userid, {
      $pull: { postid: postId },
    });

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post successfully deleted" });
  } catch (e) {
    console.error(`Error deleting post: ${e}`);
    next(e);
  }
};

//****************************************************************

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const {
      title,
      description,
      address,
      latitute,
      longtitute,
      category,
      barcode,
    } = req.body;
    const image = req.file;

    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    if (!address || !latitute || !longtitute) {
      return res
        .status(400)
        .json({ message: "Please enter a valid street name and city" });
    }

    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (image) {
      await PostImage.deleteMany({ postid: postId });

      const newPostImage: IPostImage = await PostImage.create({
        image: image.path,
        postid: postId,
      });

      await Post.findByIdAndUpdate(postId, {
        $set: {
          ...req.body,
          postimage: [newPostImage._id],
        },
      });
    } else {
      await Post.findByIdAndUpdate(postId, {
        $set: req.body,
      });
    }

    const updatedPost: IPost | null = await Post.findById(postId);
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found after update" });
    }

    res.status(200).json({ message: "Post successfully updated", updatedPost });
  } catch (e) {
    console.error(`Error updating post: ${e}`);
    next(e);
  }
};

////////***************** */

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
      .populate("postimage")
      .populate("postlikes")
      .populate("userid");
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

// ****************************************************************

export const getLikesByPOst = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const likes = await PostLike.find({ postid: id }).populate("userid");
    res.status(200).json(likes);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// ****************************************************************

export const togglePostLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postid, userid } = req.body;

  try {
    const existingLike = await PostLike.findOne({ postid, userid });
    if (existingLike) {
      await PostLike.findByIdAndDelete(existingLike._id);

      await Post.findByIdAndUpdate(postid, {
        $pull: { postlikes: existingLike._id },
      });

      await User.findByIdAndUpdate(userid, {
        $pull: { postlikes: existingLike._id },
      });
      return res
        .status(200)
        .json({ message: "Like successfully removed", existingLike });
    }

    const newLike = await PostLike.create({ postid, userid });

    await Post.findByIdAndUpdate(postid, {
      $push: { postlikes: newLike._id },
    });

    await User.findByIdAndUpdate(userid, {
      $push: { postlikes: newLike._id },
    });

    res.status(201).json({ message: "Post erfolgreich geliked", newLike });
  } catch (e) {
    console.error("Fehler beim Erstellen des Likes:", e);
    next(e);
  }
};

// ****************************************************************

export const getPostsById = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const id: any = req.params.id;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const post = await Post.findById(id)
      .populate("userid")
      .populate("category")
      .populate("postimage");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching post", error });
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const post = await Post.find()
      .populate("userid")
      .populate("category")
      .populate("postimage");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching post", error });
  }
};
