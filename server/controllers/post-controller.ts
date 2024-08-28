// import express from "express";
// import { Request, Response, NextFunction } from "express";
// import { Post, IPost } from "../models/Post";
// import { PostImage, IPostImage } from "../models/PostImages";
// import User from "../models/user-model";
// import multer from "multer";

// // const upload = multer({ dest: "uploads/" });

// export const createPost = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
   
//     const imagesStorage = multer.diskStorage({
//       destination:(req,file,cb) => {
//           cb(null, "images");
//       },
//       filename:(req,file,cb) => {
//           cb(null, "test.jpg");
//       }
//   })
  
//  const imagesUpload = multer({ storage: imagesStorage });

//  imagesUpload.single("file") // muss als middelware geändert werden in der Route 
 
//     const { title, description, city, street, country, category, userid } =
//       req.body;
//     const image = req.file;
//     const newPost: IPost = await Post.create({
//       userid: userid,
//       title: title,
//       description: description,
//       city: city,
//       street: street,
//       country: country,
//       category: category,
//       postimage: [],
//     });

//     // Lotfi : gelöscht unnötige code zeilen  
//     // let newPostImage: IPostImage | null = null;
//     if (image) {
//       const newPostImage: IPostImage = await PostImage.create({
//         image: image.path,
//         postid: newPost._id,
//       });
//       console.log(newPostImage);
//       await Post.findByIdAndUpdate(newPost._id, {
//         $push: { postimage: newPostImage._id },
//       });
//     }
//     // if (newPostImage) {
      
//     // }

//     // User.findByIdAndUpdate(userid, { $push: { posts: newPost._id } });
//     const user = await User.findById(userid);
//     if (user) {
//       user.postid.push(newPost._id as any) ;

//       await user.save();
//     }
//     res.status(201).json({ message: "Post successfully created", newPost });
//   } catch (e) {
//     console.error(e);
//     next(e);
//   }
// };



import { Request, Response, NextFunction } from "express";
import { Post, IPost } from "../models/Post";
import { PostImage, IPostImage } from "../models/PostImages";
import User from "../models/user-model";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, city, street, country, category, userid } = req.body;
    const image = req.file;

    const newPost: IPost = await Post.create({
      userid,
      title,
      description,
      city,
      street,
      country,
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
