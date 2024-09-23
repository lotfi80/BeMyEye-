import React, { useState } from "react";
import TableHeadCell from "../Table/TableHeadCell";
import { DeleteButton } from "../AccountButton/GetMyPosts/DeleteButton";
import { EditButton } from "../AccountButton/GetMyPosts/EditButton";
import IUser from "../../../interfaces/User";
import { IPost } from "../../../interfaces/Post";
import { Button } from "../Table/Button";
import { useMediaQuery } from "react-responsive";

interface TableProps {
  posts: IPost[];
  postsVisible: boolean;
  setPostsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setTableVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isMyPost: boolean;
  setIsZoomed?: React.Dispatch<React.SetStateAction<string | null>>;
  currentUser?: IUser | null;
  handleDelete: (string) => void;
  setMobileMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetUsersPost: React.FC<TableProps> = ({
  posts,
  setPostsVisible,
  setTableVisible,
  isMyPost,
  setIsZoomed = () => {},
  currentUser = null,
  handleDelete = () => {},
  setMobileMenuOpen = () => {},
}) => {
  function formatDate(dateString: any): string {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE");
  }
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleEdit = (postId: string) => {
    setPostsVisible(false);
    setMobileMenuOpen(false);
  };

  return (
    <div className=".positionContainer">
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
        <Button text="Back" />
      </div>

      <div className="table-container overflow-x-auto">
        <table className="getUsersPost rounded-lg shadow-md">
          <thead className="bg-gray-100">
            {isMobile && (
              <tr>
                <TableHeadCell>Post Title</TableHeadCell>
                <TableHeadCell>Description</TableHeadCell>
                <TableHeadCell>Post Date</TableHeadCell>
              </tr>
            )}
            {!isMobile && (
              <tr>
                <TableHeadCell>Post Title</TableHeadCell>
                <TableHeadCell>Image</TableHeadCell>
                <TableHeadCell>Description</TableHeadCell>
                <TableHeadCell>Post Date</TableHeadCell>
                {isMyPost && <TableHeadCell>Actions</TableHeadCell>}
              </tr>
            )}
          </thead>
          <tbody>
            {posts ? (
              posts.map((post) => (
                <tr key={post._id}>
                  {isMobile && (
                    <>
                      <td className="mobile">
                        {post.title}
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
                    </>
                  )}
                  {!isMobile && (
                    <>
                      <td>{post.title}</td>
                      <td>
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
                    </>
                  )}

                  <td className="p-4 max-w-xs overflow-hidden text-ellipsis text-lg">
                    {post.description}
                  </td>

                  {isMobile && (
                    <>
                      <td className=" text-md">
                        {formatDate(post.postDate)}
                        {isMyPost && (
                          <td className="flex-row justify-start gap-2">
                            <EditButton
                              postId={post._id}
                              editPost={handleEdit}
                            />
                            <DeleteButton
                              postId={post._id}
                              deletePost={handleDelete}
                            />
                          </td>
                        )}
                      </td>
                    </>
                  )}

                  {!isMobile && (
                    <>
                      <td className="p-4 text-lg">
                        {formatDate(post.postDate)}
                      </td>
                      {isMyPost && (
                        <td className="p-4 flex space-x-2">
                          <EditButton postId={post._id} editPost={handleEdit} />
                          <DeleteButton
                            postId={post._id}
                            deletePost={handleDelete}
                          />
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={isMyPost ? 5 : 4}
                  className="p-4 text-center text-gray-500 text-lg"
                >
                  No posts available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetUsersPost;
