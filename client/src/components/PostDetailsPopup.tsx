import React, { useEffect, useState, useRef } from "react";
import * as io from "socket.io-client";
import { useCategoryUserContext } from "../context/CategoryUser";
import "./popup.css";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTrash,
  faEdit,
  faPaperPlane,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import "./Header/AccountButton/GetMyPosts/button.css";
import {
  createPostComment,
  fetchOnePost,
  createPostLike,
  deletePostLike,
  deletePostComment,
  updatePostComment,
} from "../http/api";
import { EditButton } from "./Header/AccountButton/GetMyPosts/EditButton";
import { DeleteButton } from "./Header/AccountButton/GetMyPosts/DeleteButton";
import { deletePost } from "../http/api";

const socket: any = io.connect("http://localhost:5000");

interface PostDetailsPopupProps {
  selectedPost: {
    postid: string;
  };
  onClose: () => void;
}

const PostDetailsPopup: React.FC<PostDetailsPopupProps> = ({
  selectedPost,
  onClose,
}) => {
  const { user, posts, setPosts } = useCategoryUserContext();
  const [post, setPost] = useState<any>({});
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<any>({}); // interface vorbereiten : {commentId: newComment}

  const [editMode, setEditMode] = useState<any>([]); // interface vorbereiten : array of commentsId

  const modalRef = useRef<HTMLDivElement>(null);

  /*socket */
  useEffect(() => {
    socket.emit(`room${selectedPost.postid}`);
    socket.on("postLike", function ({ likes, postId }) {
      setLikes(likes);
    });
    socket.on("postComment", function ({ comments, postId }) {
      setComments(comments);
    });

    return () => {
      socket.off("postComment");
    };
  }, []);

  /*socket*/

  useEffect(() => {
    const getOnePost = async () => {
      const data = await fetchOnePost(selectedPost);
      setPost(data?.data);
      setComments(data?.postComments);
      setLikes(data?.postLikes);
      socket.emit("postLike", {
        likes: data?.postLikes,
        postId: selectedPost.postid,
      });
      socket.emit("postComment", {
        comments: data?.postComments,
        postId: selectedPost.postid,
      });
      const hasLikedByUser = data?.postLikes.find(
        (like) =>
          like.userid._id === user?._id && like.postid === selectedPost.postid
      );
      if (hasLikedByUser) {
        setHasLiked(true);
      }
    };

    getOnePost();

    // const intervalId = setInterval(() => {
    //   getOnePost();
    // }, 3000);

    // return () => clearInterval(intervalId);
  }, [selectedPost.postid]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Datum nicht verfügbar";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };

  const addComment = async () => {
    if (!comment.trim()) return;
    const data = await createPostComment(user, selectedPost, comment);
    console.log("newcomment", data);
    const commentToAdd = {
      _id: data.newComment._id,
      content: comment,
      commentDate: Date.now(),
      userid: {
        _id: user?._id,
        username: user?.username,
        profileimage: user?.profileimage,
      },
    };
    setComments((prev) => [...prev, commentToAdd]);
    setComment("");
    socket.emit("postComment", {
      comments: [...comments, commentToAdd],
      postId: selectedPost.postid,
    });
  };
  const handleDeleteComment = async (commentId: string) => {
    await deletePostComment(commentId);

    const updatedComments = [
      ...comments.filter((cmt) => cmt._id !== commentId),
    ];
    console.log("Aktualisierte Kommentare:", updatedComments);

    setComments(updatedComments);
    socket.emit("postComment", {
      comments: updatedComments,
      postId: selectedPost.postid,
    });
  };
  const handleUpdateComment = async (commentId: string, newContent: string) => {
    try {
      const response = await updatePostComment(commentId, newContent);
      setComments((prev) =>
        prev.map((cmt) =>
          cmt._id === commentId ? { ...cmt, content: newContent } : cmt
        )
      );
      socket.emit("commentUpdated", { id: commentId, content: newContent });
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };
  const handleChangeEditMode = (commentId: string) => {
    const isEditMode = editMode.includes(commentId);
    if (isEditMode) {
      setEditMode((prev) => prev.filter((id) => id !== commentId));
    } else {
      setEditMode((prev) => [...prev, commentId]);
    }
  };
  const handleNewComment = (commentId: string, updatedComment: string) => {
    setNewComment({ ...newComment, [commentId]: updatedComment });
  };

  const addLikes = async () => {
    const data = await createPostLike(user, selectedPost);
    if (hasLiked) {
      setLikes((prev) => prev.filter((like) => like.userid._id !== user?._id));
      setHasLiked(false);
      socket.emit("postLike", {
        likes: likes.filter((like) => like.userid._id !== user?._id),
        postId: selectedPost.postid,
      });
    } else {
      const newLike = {
        _id: Math.random().toString(36).substr(2, 9),
        userid: {
          _id: user?._id,
          username: user?.username,
          profileimage: user?.profileimage,
        },
      };
      setLikes((prev) => [...prev, newLike]);
      setHasLiked(true);
      socket.emit("postLike", {
        likes: [...likes, newLike],
        postId: selectedPost.postid,
      });
    }
  };

  const handleDelete = async (postId) => {
    if (!postId) {
      console.error("No postId provided");
      return;
    }

    try {
      await deletePost(postId);
      setPosts(posts.filter((post) => post._id !== postId));
      setShowPopup(false);
      setTimeout(() => {
        onClose();
      }, 500);
      // onDelete();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const userImage = (user: any): string => {
    const userImage = user?.profileimage?.includes("http")
      ? user?.profileimage
      : `http://localhost:5000/${user?.profileimage}`;
    return userImage;
  };

  return (
    <div
  className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 transition-opacity duration-300 ${
    showPopup ? "fade-in" : "fade-out"
  }`}
>
  <div
    ref={modalRef}
    className="
      bg-white rounded-lg shadow-lg w-full 
      max-w-full sm:max-w-md md:max-w-lg lg:max-w-3xl 
      max-h-[90vh] sm:max-h-[80vh] lg:max-h-[70vh] 
      overflow-y-auto relative p-4 sm:p-6 lg:p-8
    "
  >
        {" "}
        <div className="mb-6">
          {post.postimage && post.postimage[0]?.image ? (
            <img
              src={`http://localhost:5000/${post.postimage[0].image}`}
              alt="Post image"
              className="w-full h-72 object-cover rounded-lg shadow-2xl transition-shadow duration-300"
            />
          ) : (
            <div className="w-full h-72 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-gray-500">Kein Bild verfügbar</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-5">
            <h2 className="text-3xl font-bold text-gray-900 p-4">
              {post.title}
            </h2>
            {user?._id === post.userid?._id && (
              <div className="relative flex items-center justify-between mr-5 ">
                <div className="p-4">
                  <EditButton postId={post._id} />
                </div>
                <div className="p-4">
                  <DeleteButton
                    postId={post._id}
                    deletePost={() => handleDelete(post._id)}
                  />
                </div>
              </div>
            )}
          </div>

          <p className="text-lg text-[#2781b5] m-4 leading-relaxed break-words">
            <span className="m-1 font-medium text-black">
              {post.description}
            </span>
          </p>
          <p className="text-lg text-[#2781b5] mb-2">
            <span className="ml-5 font-medium text-black">{post.address}</span>
          </p>

          <p className="text-lg text-[#2781b5] mb-2">
            {" "}
            <span className="ml-5 font-medium text-black">
              {formatDate(post.postDate)}
            </span>
          </p>

          <div className="flex items-center space-x-4 mb-4">
            {post?.userid ? (
              <>
                <img
                  src={`${userImage(post.userid)}`}
                  // src={`http://localhost:5000/${post.userid.profileimage}`}
                  alt={`${post.userid.username} Profilbild`}
                  className="w-12 h-12 object-cover rounded-full shadow-md"
                />
                <p className="text-lg text-[#2781b5]">
                  Erstellt von:{" "}
                  <span className="font-medium text-gray-900">
                    {post.userid.username || "Unbekannt"}
                  </span>
                </p>
              </>
            ) : (
              <p className="text-gray-700">Ersteller unbekannt</p>
            )}

            <div className="flex items-center space-x-2 relative">
              <button onClick={addLikes} className="focus:outline-none p-0 m-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 transition-colors duration-300 ${
                    hasLiked ? "text-red-500" : "text-gray-400"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={hasLiked ? "none" : "currentColor"}
                  strokeWidth={2}
                >
                  <path
                    d="M12 21C12 21 5 13.7 5 9.5C5 7 6.5 5.5 9 5.5C10.5 5.5 12 6.5 12 6.5C12 6.5 13.5 5.5 15 5.5C17.5 5.5 19 7 19 9.5C19 13.7 12 21 12 21Z"
                    fill={hasLiked ? "currentColor" : "none"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="cursor-pointer text-gray-900"
              >
                {`${likes.length} likes`}
              </span>
              {hovered && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg p-2 m-5 text-m z-10 w-64">
                  {likes.length > 0 ? (
                    likes.map((like) => (
                      <div
                        key={like.userid._id}
                        className="flex items-center p-1 space-x-2"
                      >
                        {like.userid.profileimage ? (
                          <img
                            src={`${userImage(like.userid)}`}
                            // src={`http://localhost:5000/${like.userid.profileimage}`}
                            alt={`${like.userid.username}'s Profilbild`}
                            className="w-8 h-8 object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-white">?</span>
                          </div>
                        )}
                        <p className="truncate flex-1">
                          {like.userid.username || "Unknown"}
                          {like.userid.username === user?.username && (
                            <span className="geliktpopup">
                              {" "}
                              (Du hast es geclickt)
                            </span>
                          )}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No likes</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Hinterlassen Sie einen Kommentar
            </h3>

            <div className="flex items-center space-x-4 mb-6">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                className="w-full h-16 px-4 py-4 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Schreibe einen Kommentar..."
              />
              <button onClick={addComment} className="text-blue-500">
                <FontAwesomeIcon icon={faPaperPlane} size="lg" />
              </button>
            </div>

            <div className="space-y-4">
              {comments.length > 0 ? (
                comments
                  .sort(
                    (a, b) =>
                      new Date(b.commentDate).getTime() -
                      new Date(a.commentDate).getTime()
                  )
                  .map((cmt) => (
                    <div
                      key={cmt._id}
                      className="p-4 bg-gray-100 rounded-lg shadow-sm flex items-start space-x-4"
                    >
                      <img
                        src={`${userImage(cmt.userid)}`}
                        alt={`${cmt.userid.username} Profilbild`}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-1">
                          {cmt.userid.username}
                        </p>
                        {editMode.includes(cmt._id) ? (
                          <input
                            type="text"
                            value={newComment[cmt._id] || cmt.content}
                            onChange={(e) =>
                              handleNewComment(cmt._id, e.target.value)
                            }
                          />
                        ) : (
                          <p className="text-gray-800 break-words mb-2">
                            {cmt.content}
                          </p>
                        )}
                        {/* <p className="text-gray-800 break-words mb-2">
                    {cmt.content}

                  </p>
                  <input type="text" value={cmt.content} onChange={(e) => handleUpdateComment(cmt._id, e.target.value)} /> */}
                        <p className="text-sm text-[#b48a4e]">
                          Erstellt am {formatDate(cmt.commentDate)}
                        </p>
                      </div>

                      {user?._id === cmt.userid._id && (
                        <div>
                          <button
                            onClick={() => handleDeleteComment(cmt._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <button
                            onClick={() => handleChangeEditMode(cmt._id)}
                            className="text-green-500 hover:text-green-700"
                          >
                            {editMode.includes(cmt._id) ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                onClick={() =>
                                  handleUpdateComment(
                                    cmt._id,
                                    newComment[cmt._id]
                                  )
                                }
                              />
                            ) : (
                              <FontAwesomeIcon icon={faEdit} />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <p className="text-gray-500">
                  Noch keine Kommentare vorhanden...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPopup;
