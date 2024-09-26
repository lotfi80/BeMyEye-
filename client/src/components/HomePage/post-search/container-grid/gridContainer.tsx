import React, { useEffect, useState } from "react";
import { useCategoryUserContext } from "../../../../context/CategoryUser";
import PostDetailsPopup from "../../../PostDetailsPopup";
import Post from './post';
import "../../../../App.css";
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
        const newAccessToken = response.headers.get("x-access-token");
        console.log("Old Access Token:", localStorage.getItem("accessToken"));
        if (newAccessToken) {
          console.log("New Access Token received:", newAccessToken);
          localStorage.setItem("accessToken", newAccessToken);
        }
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
    <div className="m-4 max-h-screen overflow-y-auto p-4 rounded-lg border-2 border-solid border-[#2781b5]">
      <div className="grid grid-cols-1  gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Post key={post._id} post={post} handlePostClick={handlePostClick}/>
            ))}
      </div>

      <div className="flex justify-center p-8">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          // className="flex items-center px-10 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-transform transform hover:scale-105 disabled:opacity-50"

          className="button"
        >
          <i className="fa-solid fa-angles-left fa-xl"></i>Previous
        </button>
        <span className="mx-6 my-6 text-lg font-bold text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() =>
            setPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={page === totalPages}
          // className="flex items-center px-10 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-transform transform hover:scale-105 disabled:opacity-50"

          className="button"
        >
          Next
          <i className="fa-solid fa-angles-right ml-2 fa-xl"></i>
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
