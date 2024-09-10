import React from "react";

interface PostDetailsPopupProps {
  post: {
    title: string;
    description: string;
    address: string;
    postDate?: string;
    image: string;
  };
  onClose: () => void;
}

const PostDetailsPopup: React.FC<PostDetailsPopupProps> = ({ post, onClose }) => {
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full overflow-hidden relative p-6">
        <button
          onClick={onClose}
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

        <div className="p-6">
          {post.image ? (
            <div className="mb-6">
              <img
                src={post.image}
                alt="Post image"
                className="w-full h-72 object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="w-full h-72 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {post.title}
          </h2>
          <p className="text-base text-gray-700 mb-4">{post.description}</p>

          <p className="text-sm text-gray-600 mb-2">
            Erstellt am: {formatDate(post.postDate)}
          </p>

          <p className="text-sm text-gray-600 mb-2">Adresse: {post.address}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPopup;
