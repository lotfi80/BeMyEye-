

import { Request, Response, NextFunction } from "express";
import { Post, IPost } from "../models/Post";
import { PostImage, IPostImage } from "../models/PostImages";
import User from "../models/user-model";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, address, latitute,longtitute, category, userid } = req.body;
    console.log(userid ,'test ',req.body);
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



export const getFilteredPosts = async (req: Request, res: Response) => {
  try {
    const { lat, lng, maxDistance } = req.query;
    console.log(req.query , 'test query');

    let query: any = {};
    const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 9;
        const categoryId = req.query.categoryId as string;
        const skip = (page - 1) * limit;
        if (categoryId) {
          query = { category: categoryId };
        }

    if (lat && lng && maxDistance) {
      const maxDistanceInMeters = parseInt(maxDistance as string) * 1000; // convert km to meters

      query.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng as string), parseFloat(lat as string)]
          },
          $maxDistance: 550
        }
      };
    }

  

    console.log(query, 'test query after');
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
   const posts = await Post.find(query)

        .populate("userid")
        .populate("category")
        .populate("postimage")
        .skip(skip).limit(limit).sort({ createdAt: -1 });
        const totalPosts = await Post.countDocuments(query);
    
        const totalPages = Math.ceil(totalPosts / limit);
        res.status(200).send({ 
          posts,
          currentPage: page,
          totalPages,
          totalPosts,
        });

    // res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};
