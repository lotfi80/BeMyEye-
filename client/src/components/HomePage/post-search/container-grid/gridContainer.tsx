
import React, { useEffect, useState } from 'react';
import { useCategoryUserContext } from '../../../../context/CategoryUser';

const GridContainer: React.FC = () => {
  const { selectedCategory , longFilter, latFilter, selectedDistance } = useCategoryUserContext();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = new URLSearchParams({
          categoryId: selectedCategory || '',
           long: longFilter?.toString() || '',
            lat: latFilter?.toString() || '',
            maxDistance: selectedDistance?.toString() || '5',
          // distance: selectedDistance?.toString() || '',
          page: page.toString(),
          limit: '9'
        });

        const response = await fetch(
          `http://localhost:5000/posts/?${query}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setPosts(data.posts);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        setError('Error fetching posts');
        setLoading(false);

      }
    };

    fetchPosts();
  }, [selectedCategory, longFilter, latFilter, selectedDistance, page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  console.log(posts)

  return (
<div>

      <div className="grid grid-cols-3 gap-4 p-4 h-full">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-gray-200 p-4 rounded-md shadow-md hover:bg-gray-300 transition-colors"
        >
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p>{post.description}</p>
          <p>{post.address}</p>
          <p>{post.body}</p>
          {post.postimage && post.postimage.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <img
                src={`http://localhost:5000/${post.postimage[0].image}`}
                alt={`Post image`}
                className="w-full h-auto object-cover rounded-md shadow-md"
              />
            </div>
          )}
        </div>
      ))}
       

    </div>
    <div className="flex justify-center p-4">
  <button
    onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
    disabled={page === 1}
    className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm"
  >
    Previous
  </button>
  <span className="mx-2 text-sm">Page {page} of {totalPages}</span>
  <button
    onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))}
    disabled={page === totalPages}
    className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm"
  >
    Next
  </button>
</div>
</div>


    
  );
};

export default GridContainer;
