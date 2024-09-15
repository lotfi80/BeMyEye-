
import React, { useEffect, useState } from "react";
import { useCategoryUserContext } from "../context/CategoryUser";
import "./popup.css";
import {
  createPostComment,
  fetchOnePost,
  createPostLike,
  deletePostLike,
} from "../http/api";

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
  const { user } = useCategoryUserContext();
  const [post, setPost] = useState<any>({});
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    const getOnePost = async () => {
      const data = await fetchOnePost(selectedPost);
      setPost(data?.data);
      setComments(data?.postComments);
      setLikes(data?.postLikes);
    };
    getOnePost();
  }, [selectedPost.postid]);

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

    try {
      const data = await createPostComment(user, selectedPost, comment);
      const commentToAdd = {
        ...data.newComment,
        userid: {
          username: user?.username,
          profileimage: user?.profileimage,
        },
      };
      setComments((prev) => [...prev, commentToAdd]);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const addLikes = async () => {
    try {
      const data = await createPostLike(user, selectedPost);
      if (data.newLike) {
        const newLike = {
          ...data.newLike,
          userid: {
            _id: user?._id,
            username: user?.username,
            profileimage: user?.profileimage,
          },
        };
        setLikes((prev) => [...prev, newLike]);
      } else {
        setLikes(likes.filter((like) => like._id !== data.existingLike._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hasLiked = likes.find(
    (like) =>
      like.userid._id === user?._id && like.postid === selectedPost.postid
  );
  console.log(post)

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 transition-opacity duration-300 ${
        showPopup ? "fade-in" : "fade-out"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full overflow-hidden relative p-6">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-900 p-3 rounded-full transition-colors bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {post.postimage && post.postimage.length > 0 ? (
            <div className="mb-6">
              <img
                src={`http://localhost:5000/${post.postimage[0].image}`}
                alt="Post image"
                className="w-full h-72 object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="w-full h-72 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Kein Bild verfügbar</span>
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h2>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed break-words">
            Description: {post.description}
          </p>

          <p className="text-sm text-gray-600 mb-2">
            Erstellt am:{" "}
            <span className="font-medium">{formatDate(post.postDate)}</span>
          </p>
          <p>
            Erstellt von:{" "}
            <span className="font-medium">
              {post.userid && post.userid.username||'Unknown'}
              
            </span>
          </p>

          <p className="text-sm text-gray-600 mb-2">
            Adresse: <span className="font-medium">{post.address}</span>
          </p>

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
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg p-2 text-sm z-10 w-64">
                {likes.length > 0 ? (
                  likes.map((like) => (
                    <p key={like.userid._id} className="truncate p-1">
                      {like.userid.username || "Unknown"}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">No likes</p>
                )}
              </div>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Kommentare
            </h3>

            <div className="flex items-center space-x-4 mb-6">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Schreibe einen Kommentar..."
              />
              <button
                onClick={addComment}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Absenden
              </button>
            </div>

            <div className="space-y-4 max-h-48 overflow-y-auto">
              {comments.length > 0 ? (
                comments
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.commentDate).getTime() -
                      new Date(a.commentDate).getTime()
                  )
                  .map((cmt) => (
                    <div
                      key={cmt.id}
                      className="p-4 bg-gray-100 rounded-lg shadow-sm"
                    >
                      <img
                        src={`http://localhost:5000/${cmt.userid.profileimage}`}
                        alt={`${cmt.userid.username} Profilbild`}
                        className="w-12 h-12 object-cover rounded-full mr-4"
                      />
                      <div className="flex-1">
                        <p className="text-gray-800 break-words whitespace-normal">
                          {cmt.content}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Gepostet von:{" "}
                          <span className="font-semibold">
                            {cmt.userid.username}
                          </span>{" "}
                          am {formatDate(cmt.commentDate)}
                        </p>
                      </div>
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
