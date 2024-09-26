import React, { useEffect, useState} from 'react';
import * as io from "socket.io-client";

const socket: any = io.connect("http://localhost:5000");

interface PostProps {
    post: any
    handlePostClick: (any) => void;
  }

const Post: React.FC<PostProps> = ({
    post,
    handlePostClick,
}) => {
    const [comments, setComments] = useState<any[]>([]);
    const [likes, setLikes] = useState<any[]>([]);
    useEffect(() => {
        console.log('post._iddddd', post._id);
        socket.emit("joinRoom", { postId: post._id });
        // socket.emit(`room${post._id}`);
        socket.on("postLike", function ({ likes, postId }) {
            console.log('compo post', likes);
            if (postId === post._id) {
          setLikes(likes);
            }
        });
        socket.on("postComment", function ({ comments, postId }) {
            if (postId === post._id) {
          setComments(comments);
            }
        });
    
        return () => {
          socket.off("postLike");
          socket.off("postComment");
        };
    }, [post._id, socket]);
    useEffect(() => {
        setComments(post.postcomments);
        console.log('post.postlikes', post.postlikes);
      setLikes(post.postlikes);
    //   socket.emit(`room${post._id}`);
    //   socket.emit("postLike", {
    //     likes: post.postlikes,
    //     postId: post._id,
    //   });
    //   socket.emit("postComment", {
    //     comments: post.postcomments,
    //     postId: post._id,
    //   });
    
        // return () => {
        //   socket.off("postLike");
        //   socket.off("postComment");
        // };
      }, [post._id]);
    const formatDate = (dateString?: string) => {
        if (!dateString) return "Datum nicht verfügbar";
    
        const date = new Date(dateString);
        const now = new Date();
        const differenceInSeconds = Math.floor(
          (now.getTime() - date.getTime()) / 1000
        );
    
        if (differenceInSeconds < 60) {
          return `vor ${differenceInSeconds} Sekunden`;
        } else if (differenceInSeconds < 3600) {
          const minutes = Math.floor(differenceInSeconds / 60);
          return `vor ${minutes} Minuten`;
        } else if (differenceInSeconds < 86400) {
          const hours = Math.floor(differenceInSeconds / 3600);
          return `vor ${hours} Stunden`;
        } else {
          const days = Math.floor(differenceInSeconds / 86400);
          return `vor ${days} Tagen`;
        }
      };

    const userImage = (user: any): string => {
        const userImage = user?.profileimage?.includes("http")
          ? user?.profileimage
          : `http://localhost:5000/${user?.profileimage}`;
        return userImage;
      }
    return (
        <div
            key={post._id}
            onClick={() => handlePostClick(post)}
            className=" p-4 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
          >
            <div className="mb-3">
              {post.postimage && post.postimage.length > 0 ? (
                <img
                  src={`http://localhost:5000/${post.postimage[0].image}`}
                  alt="Post image"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>

            <h2 className="text-lg font-bold text-gray-800 mb-2 truncate">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600 truncate mb-1">
              {post.description}
            </p>
            <p className="text-sm text-gray-500 truncate mb-1">
              {post.address}
            </p>
            <p className="text-sm text-gray-500 truncate mb-1">{post.body}</p>
            {post.category && post.category.name && (
              <p className="text-sm text-blue-500 truncate mb-1">
                {post.category.name}
              </p>
            )}
            <p className="text-sm text-gray-600 mb-2">
              Gepostet:{" "}
              <span className="font-medium">{formatDate(post.postDate)}</span>
            </p>

            {post.userid && (
              <div className="flex items-center mt-3 space-x-3">
                {post.userid.profileimage && (
                  <img
                    src={`${userImage(post.userid)}`}
                    // src={`http://localhost:5000/${post.userid.profileimage}`}
                    alt={`${post.userid.username || "User"} Profilbild`}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                )}
                <p className="text-sm text-gray-500">
                  Gepostet von:
                  <span
                    className="text-sm text-blue-500 cursor-pointer hover:underline ml-1"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {post.userid.username || "Unknown"}
                  </span>
                </p>
              </div>
            )}

            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center space-x-1">
                <p className="text-m black truncate">
                  {likes.length} Likes
                </p>
                <div
                  className={`flex items-center ${
                    likes.length > 0
                      ? "text-red-500"
                      : "border text-red-500"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${
                      likes.length > 0 ? "fill-red-500" : "fill-white"
                    }`}
                    fill={likes.length > 0 ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-black truncate">
                {comments.length} comments
                
              </p>
            </div>
          </div>
    )
}

export default Post;
