import React, { useState } from "react";
import TableHeadCell from "../Table/TableHeadCell";
import { Button } from "../Table/Button";
import { DeleteButton } from "../AccountButton/GetMyPosts/DeleteButton";
import { EditButton } from "../AccountButton/GetMyPosts/EditButton";
import IUser from "../../../interfaces/User";
import { IPost } from "../../../interfaces/Post";

interface TableProps {
  posts: IPost[];
  postsVisible: boolean;
  setPostsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setTableVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isMyPost: boolean;
  setIsZoomed?: React.Dispatch<React.SetStateAction<string | null>>;
  currentUser?: IUser | null;
}

const GetUsersPost: React.FC<TableProps> = ({
  posts,
  setPostsVisible,
  setTableVisible,
  isMyPost,
  setIsZoomed = () => {},
  currentUser = null,
}) => {
  function formatDate(dateString: any): string {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE");
  }

  return (
    <>
      <div
        className="absolute top-5 left-5"
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
      <table className="min-w-full divide-y divide-gray-400">
        <thead className="bg-gray-100">
          <tr>
            <TableHeadCell>Post Title</TableHeadCell>
            <TableHeadCell>Image</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Post Date</TableHeadCell>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 p-5">
          {posts
            ? posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-200">
                  <td>{post.title}</td>
                  <td>
                    {post.postimage.length === 0 ? (
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                        alt="NoImage"
                        className="w-16 h-16 object-cover my-4 "
                      />
                    ) : (
                      <img
                        src={
                          post.postimage[0]?.image.includes("http")
                            ? post?.postimage[0]?.image
                            : `http://localhost:5000/${post.postimage[0]?.image}`
                        }
                        alt="postimage"
                        className="w-16 h-16 object-cover my-4"
                      />
                    )}
                  </td>
                  <td className="max-w-md break-words">{post.description}</td>
                  <td>{formatDate(post.postDate)}</td>

                  {isMyPost && (
                    <>
                      <td>
                        <EditButton postId={post._id} />
                      </td>
                      <td>
                        <DeleteButton postId={post._id} />
                      </td>
                    </>
                  )}
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </>
  );
};

export default GetUsersPost;
