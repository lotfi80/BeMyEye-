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

  return (
    <div className="max-h-screen overflow-y-auto p-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            onClick={() => handlePostClick(post)}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
          >
            {post.postimage && post.postimage.length > 0 && (
              <div className="mb-3">
                <img
                  src={`http://localhost:5000/${post.postimage[0].image}`}
                  alt="Post image"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
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
            {/* <span className="block text-xs font-medium text-blue-600 mt-3">
              {post.category.name}
            </span> */}
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






