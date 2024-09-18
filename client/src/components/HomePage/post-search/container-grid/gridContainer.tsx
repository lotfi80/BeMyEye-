import React, { useEffect, useState } from "react";
import { useCategoryUserContext } from "../../../../context/CategoryUser";
import PostDetailsPopup from "../../../PostDetailsPopup";

const GridContainer: React.FC = () => {
  const {
    selectedCategory,
    longFilter,
    latFilter,
    selectedDistance,
    posts,
    setPosts,
  } = useCategoryUserContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);

  const [selectedPost, setSelectedPost] = useState<{
    // title: string;
    // description: string;
    // address: string;
    // city: string;
    // street: string;
    // country: string;
    // image: string;
    postid: string;
    // postDate?: string;
  } | null>(null);

  useEffect(() => {
    console.log("Latitude:", latFilter);
    console.log("Longitude:", longFilter);
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Distance:", selectedDistance);

    const fetchPosts = async () => {
      try {
        const query = new URLSearchParams({
          categoryId: selectedCategory || "",
          ...(longFilter && { long: longFilter.toString() }),
          ...(latFilter && { lat: latFilter.toString() }),
          maxDistance: selectedDistance?.toString() || "5",
          page: page.toString(),
          limit: "15",
        });

        const response = await fetch(`http://localhost:5000/posts/?${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        setError("Error fetching posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory, longFilter, latFilter, selectedDistance, page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  console.log(posts);

  const handlePostClick = (post: any) => {
    setSelectedPost({
      postid: post._id,
      // title: post.title,
      // description: post.description,
      // address: post.address,
      // city: post.city,
      // street: post.street,
      // country: post.country,
      // postDate: post.postDate,
      // image: post.postimage && post.postimage.length > 0 ? `http://localhost:5000/${post.postimage[0].image}` : ''
    });
  };

  const handleClosePopup = () => {
    setSelectedPost(null);
  };
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Datum nicht verfügbar";
  
    const date = new Date(dateString);
    const now = new Date();
    const differenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
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
  


  return (
    <div className="max-h-screen overflow-y-auto p-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            onClick={() => handlePostClick(post)}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
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
  Gepostet: <span className="font-medium">{formatDate(post.postDate)}</span>
</p>


            {post.userid && (
              <div className="flex items-center mt-3 space-x-3">
                {post.userid.profileimage && (
                  <img
                    src={`http://localhost:5000/${post.userid.profileimage}`}
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
                <p className="text-sm text-gray-500 truncate">
                  {post.postlikes.length} Likes
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    post.postlikes.length > 0 ? "text-red-500" : "text-gray-500"
                  }`}
                  fill={post.postlikes.length > 0 ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {post.postcomments.length} comments
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center p-4">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Previous
        </button>
        <span className="mx-4 text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() =>
            setPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>

      {selectedPost && (
        <PostDetailsPopup
          selectedPost={selectedPost}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default GridContainer;
