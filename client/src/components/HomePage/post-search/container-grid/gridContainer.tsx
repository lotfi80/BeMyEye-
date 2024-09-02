
import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../../../http/api";

// function GridContainer() {
//   const [posts, setPosts] = useState<any[]>([]);

//   useEffect(() => {
//     async function fetchData() {
//       const data = await getAllPosts();
//       if (data && Array.isArray(data.posts)) {
//         setPosts(data.posts); 
//       } else {
//         console.error("Unexpected API response format:", data);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="grid grid-cols-3 gap-4 p-4 h-full">
//       {posts.map((post, index) => (
//         <div
//           key={index}
//           className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300 transition-colors"
//         >
//           <h2 className="text-lg font-bold">{post.title}</h2>
//           <p>{post.description}</p>
//           <p>{post.city}</p>
//           <p>{post.body}</p>

          
//           {post.postimage && post.postimage.length > 0 && (
//             <div className="flex flex-wrap gap-2">
//               {post.postimage.map((image, imgIndex) => (
//                 <img
//                   key={imgIndex}
//                   src={image.url}
//                   alt={`Post image ${imgIndex + 1}`}
//                   className="w-full h-auto object-cover rounded-md shadow-md"
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default GridContainer;

interface PostImage {
  image: string; 
}

interface Post {
  title: string;
  description: string;
  city: string;
  body: string;
  postimage: PostImage[];
}

function GridContainer() {
  const [posts, setPosts] = useState<any[]>([]);  
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);   
  const postsPerPage = 9;  

  useEffect(() => {
    async function fetchData() {
      const data = await getAllPosts(currentPage, postsPerPage);
      if (data && Array.isArray(data.posts)) {
        setPosts(data.posts);             
        setTotalPages(data.totalPages);  
      } else {
        console.error("Unexpected API response format:", data);
      }
    }
    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const postImagesPath = "http://localhost:5000/";

  return (
    <div className="p-4 h-full">
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post, index) => (
        <div
          key={index}
          className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300 transition-colors"
        >
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p>{post.description}</p>
          <p>{post.address}</p>
          <p>{post.body}</p>
          {post.postimage && post.postimage.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.postimage[0] && (
                <img
                  src={postImagesPath + post.postimage[0].image}
                  alt={`Post image`}
                  className="w-full h-auto object-cover rounded-md shadow-md"
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded-md shadow-md hover:bg-gray-400 transition-colors disabled:opacity-50"
      >
        Previous
      </button>
      <span className="mx-4">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded-md shadow-md hover:bg-gray-400 transition-colors disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
  
  );
}

export default GridContainer;