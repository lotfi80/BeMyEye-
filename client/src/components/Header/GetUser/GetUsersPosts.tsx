import React, { useState } from "react";
import TableHeadCell from "../Table/TableHeadCell";
import { Button } from "../Table/Button";
import { DeleteButton } from "../AccountButton/GetMyPosts/DeleteButton";
import { EditButton } from "../AccountButton/GetMyPosts/EditButton";
import IUser from "../../../interfaces/User";
import { IPost } from "../../../interfaces/Post";
import { deletePost } from "../../../http/api";
// import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();

interface TableProps {
  posts: IPost[];
  postsVisible: boolean;
  setPostsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setTableVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isMyPost: boolean;
  setIsZoomed?: React.Dispatch<React.SetStateAction<string | null>>;
  currentUser?: IUser | null;
  handleDelete: (postId: string) => void;
}

const GetUsersPost: React.FC<TableProps> = ({
  posts,
  setPostsVisible,
  setTableVisible,
  isMyPost,
  setIsZoomed = () => {},
  currentUser = null,
  handleDelete = () => {},
}) => {
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  function formatDate(dateString: any): string {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE");
  }

  const handleEdit = (postId: string) => {
    setEditingPostId(postId);
  };

  return (
    <div className="relative p-4">
      <div
        className="absolute top-5 left-5 z-10"
        onClick={() => {
          if (currentUser) {
            setPostsVisible(false);
            setTableVisible(true);
            setIsZoomed(currentUser?._id);
          }
        }}
      >
        {/* <Button text="Back" /> */}
      </div>

      <div className="table-container overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <TableHeadCell >Post Title</TableHeadCell>
              <TableHeadCell >Image</TableHeadCell>
              <TableHeadCell >Description</TableHeadCell>
              <TableHeadCell >Post Date</TableHeadCell>
              {isMyPost && <TableHeadCell >Actions</TableHeadCell>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts
              ? posts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-100">
                    <td className="p-4 text-gray-800 text-lg">{post.title}</td>
                    <td className="p-4">
                      <img
                        src={
                          post.postimage[0]?.image.includes("http")
                            ? post.postimage[0]?.image
                            : `http://localhost:5000/${post.postimage[0]?.image}`
                        }
                        alt="postimage"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-4 max-w-xs overflow-hidden text-ellipsis text-lg">{post.description}</td>
                    <td className="p-4 text-lg">{formatDate(post.postDate)}</td>
                    {isMyPost && (
                      <td className="p-4 flex space-x-2">
                        <EditButton postId={post._id} editPost={handleEdit} />
                        <DeleteButton postId={post._id} deletePost={handleDelete} />
                      </td>
                    )}
                  </tr>
                ))
              : (
                <tr>
                  <td colSpan={isMyPost ? 5 : 4} className="p-4 text-center text-gray-500 text-lg">
                    No posts available.
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>

      {editingPostId && (
        <div>
          {}
        </div>
      )}
    </div>
  );
};

export default GetUsersPost;
