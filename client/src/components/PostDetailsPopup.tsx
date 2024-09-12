import React, { useEffect, useState } from "react";
import { useCategoryUserContext } from "../context/CategoryUser";
import "./popup.css";

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
  const [showPopup, setShowPopup] = useState<boolean>(true);

  useEffect(() => {
    const fetchOnePost = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/posts/${selectedPost.postid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch post");
        const data = await response.json();
        setPost(data);
        if (data.postcomments) {
          const res = await fetch(
            `http://localhost:5000/posts/comment/get?postid=${data._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!res.ok) throw new Error("Failed to fetch comments");
          const postComments = await res.json();
          setComments(postComments);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchOnePost();
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
      const response = await fetch(
        `http://localhost:5000/posts/comment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: user?._id,
            postid: selectedPost.postid,
            content: comment,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to add comment");
      const data = await response.json();
      setComments((prev) => [...prev, data.newComment]);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

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

          <p className="text-sm text-gray-600 mb-2">
            Adresse: <span className="font-medium">{post.address}</span>
          </p>

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
