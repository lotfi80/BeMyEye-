// import React, { useState } from "react";
// import TableHeadCell from "../Table/TableHeadCell";
// import { Button } from "../Table/Button";
// import { DeleteButton } from "../AccountButton/GetMyPosts/DeleteButton";
// import { EditButton } from "../AccountButton/GetMyPosts/EditButton";
// import IUser from "../../../interfaces/User";

// interface TableProps {
//   posts: any[];
//   postsVisible: boolean;
//   setPostsVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   setTableVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   isMyPost: boolean;
//   setIsZoomed?: React.Dispatch<React.SetStateAction<string | null>>;
//   currentUser?: IUser | null;
// }

// const GetUsersPost: React.FC<TableProps> = ({
//   posts,
//   setPostsVisible,
//   setTableVisible,
//   isMyPost,
//   setIsZoomed = () => {},
//   currentUser = null,
// }) => {
//   function formatDate(dateString: any): string {
//     if (!dateString) {
//       return "";
//     }
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   }

//   return (
//     <>
//       <div
//         className="absolute top-5 left-5 "
//         onClick={() => {
//           if (currentUser) {
//             setPostsVisible(false);
//             setTableVisible(true);
//             setIsZoomed(currentUser?._id);
//           }
//         }}
//       >
//         <Button text="Back" />
//       </div>
//       <table
//         className="min-w-full divide-y divide-gray-400
//        "
//       >
//         <thead className="bg-gray-100 ">
//           <tr>
//             <TableHeadCell>Post Title</TableHeadCell>
//             <TableHeadCell>Image</TableHeadCell>
//             <TableHeadCell>Description</TableHeadCell>
//             <TableHeadCell>Post Date</TableHeadCell>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200 p-5">
//           {posts
//             ? posts.map((post) => (
//                 <tr key={post._id} className="hover:bg-gray-200">
//                   <td>{post.title}</td>
//                   <td>
//                     <img
//                       src={
//                         post.postimage[0].image.includes("http")
//                           ? post.image
//                           : `http://localhost:5000/${post.postimage[0].image}`
//                       }
//                       alt="postimage"
//                       className="w-16 h-16 object-cover my-4 "
//                     />
//                   </td>
//                   <td
//                     className="max-w-md break-words 
// "
//                   >
//                     {post.description}
//                   </td>
//                   <td>{formatDate(post.postDate)}</td>
//                   {isMyPost && (
//                     <>
//                       <td>
//                         <EditButton />
//                       </td>
//                       <td>
//                         <DeleteButton />
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))
//             : null}
//         </tbody>
//       </table>
//     </>
//   );
// };
// export default GetUsersPost;

// import React from "react";
// import TableHeadCell from "../Table/TableHeadCell";
// import { Button } from "../Table/Button";
// import { DeleteButton } from "../AccountButton/GetMyPosts/DeleteButton";
// import { EditButton } from "../AccountButton/GetMyPosts/EditButton";
// import IUser from "../../../interfaces/User";
// import { IPost } from "../../../interfaces/Post"; // Ensure you have this import


// interface TableProps {
//   posts: IPost[]; // Use IPost for type safety
//   postsVisible: boolean;
//   setPostsVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   setTableVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   isMyPost: boolean;
//   setIsZoomed?: React.Dispatch<React.SetStateAction<string | null>>;
//   currentUser?: IUser | null;
// }

// const GetUsersPost: React.FC<TableProps> = ({
//   posts,
//   setPostsVisible,
//   setTableVisible,
//   isMyPost,
//   setIsZoomed = () => {},
//   currentUser = null,
// }) => {
//   function formatDate(dateString: any): string {
//     if (!dateString) {
//       return "";
//     }
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   }

//   const handleDelete = (postId: string) => {
//     // Define the delete functionality here
//     console.log('Deleting post with id:', postId);
//     // You might want to call a function that updates the state or make an API call
//   };

//   return (
//     <>
//       <div
//         className="absolute top-5 left-5"
//         onClick={() => {
//           if (currentUser) {
//             setPostsVisible(false);
//             setTableVisible(true);
//             setIsZoomed(currentUser?._id);
//           }
//         }}
//       >
//         <Button text="Back" />
//       </div>
//       <table className="min-w-full divide-y divide-gray-400">
//         <thead className="bg-gray-100">
//           <tr>
//             <TableHeadCell>Post Title</TableHeadCell>
//             <TableHeadCell>Image</TableHeadCell>
//             <TableHeadCell>Description</TableHeadCell>
//             <TableHeadCell>Post Date</TableHeadCell>
//             {isMyPost && (
//               <>
//                 <TableHeadCell>Edit</TableHeadCell>
//                 <TableHeadCell>Delete</TableHeadCell>
//               </>
//             )}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200 p-5">
//           {posts.map((post) => (
//             <tr key={post._id} className="hover:bg-gray-200">
//               <td>{post.title}</td>
//               <td>
//                 <img
//                   src={
//                     post.postimage[0].image.includes("http")
//                       ? post.postimage[0].image
//                       : `http://localhost:5000/${post.postimage[0].image}`
//                   }
//                   alt="postimage"
//                   className="w-16 h-16 object-cover my-4"
//                 />
//               </td>
//               <td className="max-w-md break-words">{post.description}</td>
//               <td>{formatDate(post.postDate)}</td>
//               {isMyPost && (
//                 <>
//                   <td>
//                     <EditButton postId={post._id} />
//                   </td>
//                   <td>
//                     <DeleteButton
//                       postId={post._id}
//                       onDelete={() => handleDelete(post._id)}
//                     />
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default GetUsersPost;
//// aerbeitet mit delete
// import React from 'react';
// import TableHeadCell from "../Table/TableHeadCell";
// import { Button } from "../Table/Button";
// import { DeleteButton } from "../AccountButton/GetMyPosts/DeleteButton";
// import { EditButton } from "../AccountButton/GetMyPosts/EditButton";
// import IUser from "../../../interfaces/User";
// import {IPost} from "../../../interfaces/Post";

// interface TableProps {
//   posts: IPost[];
//   postsVisible: boolean;
//   setPostsVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   setTableVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   isMyPost: boolean;
//   setIsZoomed?: React.Dispatch<React.SetStateAction<string | null>>;
//   currentUser?: IUser | null;
// }

// const GetUsersPost: React.FC<TableProps> = ({
//   posts,
//   setPostsVisible,
//   setTableVisible,
//   isMyPost,
//   setIsZoomed = () => {},
//   currentUser = null,
// }) => {
//   function formatDate(dateString: any): string {
//     if (!dateString) {
//       return "";
//     }
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   }

//   return (
//     <>
//       <div
//         className="absolute top-5 left-5"
//         onClick={() => {
//           if (currentUser) {
//             setPostsVisible(false);
//             setTableVisible(true);
//             setIsZoomed(currentUser?._id);
//           }
//         }}
//       >
//         <Button text="Back" />
//       </div>
//       <table className="min-w-full divide-y divide-gray-400">
//         <thead className="bg-gray-100">
//           <tr>
//             <TableHeadCell>Post Title</TableHeadCell>
//             <TableHeadCell>Image</TableHeadCell>
//             <TableHeadCell>Description</TableHeadCell>
//             <TableHeadCell>Post Date</TableHeadCell>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200 p-5">
//           {posts
//             ? posts.map((post) => (
//                 <tr key={post._id} className="hover:bg-gray-200">
//                   <td>{post.title}</td>
//                   <td>
//                     <img
//                       src={
//                         post.postimage[0]?.image.includes("http")
//                           ? post.postimage[0]?.image
//                           : `http://localhost:5000/${post.postimage[0]?.image}`
//                       }
//                       alt="postimage"
//                       className="w-16 h-16 object-cover my-4"
//                     />
//                   </td>
//                   <td className="max-w-md break-words">
//                     {post.description}
//                   </td>
//                   <td>{formatDate(post.postDate)}</td>
//                   {isMyPost && (
//                     <>
//                       <td>
//                         <EditButton postId={post._id} />
//                       </td>
//                       <td>
//                         <DeleteButton postId={post._id} onDelete={() => {/* logic to remove post from UI */}} />
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))
//             : null}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default GetUsersPost;

import React, { useState } from "react";
import TableHeadCell from "../Table/TableHeadCell";
import { Button } from "../Table/Button";
import { DeleteButton } from "../AccountButton/GetMyPosts/DeleteButton";
import { EditButton } from "../AccountButton/GetMyPosts/EditButton";
import IUser from "../../../interfaces/User";
import { IPost } from "../../../interfaces/Post";
import { deletePost } from '../../../http/api';
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
    return date.toLocaleDateString();
  }

  const handleEdit = (postId: string) => {
    // setEditingPostId(postId);
    // if (postId) {
      
    // }
    

  };

  // const handleDelete = (postId: string) => {
  //   // Logic to delete the post and update the UI
  // };
  // const handleDelete = async (postId) => {
  //   if (!postId) {
  //     console.error('No postId provided');
  //     return;
  //   }

  //   try {
  //     await deletePost(postId);
  //     // setPosts(posts.filter((post) => post._id !== postId));
  //     // onDelete();
  //   } catch (error) {
  //     console.error('Failed to delete post:', error);
  //   }
  // };
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
                    <img
                      src={
                        post.postimage[0]?.image.includes("http")
                          ? post.postimage[0]?.image
                          : `http://localhost:5000/${post.postimage[0]?.image}`
                      }
                      alt="postimage"
                      className="w-16 h-16 object-cover my-4"
                    />
                  </td>
                  <td className="max-w-md break-words">
                    {post.description}
                  </td>
                  <td>{formatDate(post.postDate)}</td>
                  {isMyPost && (
                    <>
                      <td>
                        <EditButton postId={post._id} /*onEdit={handleEdit}*/></EditButton> 
                      </td>
                      <td>
                        <DeleteButton postId={post._id} deletePost= {handleDelete}  />
                      </td>
                    </>
                  )}
                </tr>
              ))
            : null}
        </tbody>
      </table>

      {editingPostId && (
        <div>
     
        </div>
      )}
    </>
  );
};

export default GetUsersPost;

