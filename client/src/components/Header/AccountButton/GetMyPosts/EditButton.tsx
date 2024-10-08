// import React from "react";
// import "./button.css";

// export const EditButton: React.FC = () => {
//   return (
//     <div>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 512 512"
//         width="15px"
//         height="15px"
//         className="icon"
//       >
//         <path
//           d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9
//  30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8
//   13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6
//    5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4
//     241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43
//      96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32
//       32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7
//        0 32-14.3 32-32s-14.3-32-32-32L96 64z"
//         />
//       </svg>
//     </div>
//   );
// };

// import React from 'react';
// import "./button.css";
// import { Link } from 'react-router-dom';

// interface EditButtonProps {
//   postId: string;
//   onEdit: (postId: string) => void;
// }

// export const EditButton: React.FC<EditButtonProps> = ({ postId, onEdit }) => {
//   const handleEdit = () => {
//     onEdit(postId);
//   };

//   // return (
//   //   <button
//   //     onClick={handleEdit}
//   //     aria-label="Edit post"
//   //     className="edit-button"
//   //   >
//   //     <svg
//   //       xmlns="http://www.w3.org/2000/svg"
//   //       viewBox="0 0 448 512"
//   //       width="20px"
//   //       height="20px"
//   //       className="icon"
//   //     >
//   //       <Link to={`/posts/${postId}`} >
//   //             posts
//   //           </Link>
//   //       <path
//   //         d="M290.7 30.3c-12.5-12.5-32.8-12.5-45.3 0L80.1 178.2c-12.5 12.5-12.5 32.8 0 45.3l20.9 20.9 45.3-45.3-20.9-20.9L290.7 30.3zm-16.6 150.2L138.8 228.1 111.5 255.4l39.2 39.2 39.2-39.2-39.2-39.2zm50.7 182.3L328.1 128.4c-12.5-12.5-32.8-12.5-45.3 0l-38.3 38.3 39.2 39.2 38.3-38.3c12.5-12.5 12.5-32.8 0-45.3L223.1 128.4c-12.5-12.5-32.8-12.5-45.3 0l-38.3 38.3L64.5 315.2c-12.5 12.5-12.5 32.8 0 45.3l20.9 20.9 45.3-45.3-20.9-20.9 45.3-45.3L310.7 356.6c12.5 12.5 32.8 12.5 45.3 0l20.9-20.9c12.5-12.5 12.5-32.8 0-45.3zM290.7 30.3c-12.5-12.5-32.8-12.5-45.3 0L80.1 178.2c-12.5 12.5-12.5 32.8 0 45.3l20.9 20.9 45.3-45.3-20.9-20.9L290.7 30.3zm-16.6 150.2L138.8 228.1 111.5 255.4l39.2 39.2 39.2-39.2-39.2-39.2zm50.7 182.3L328.1 128.4c-12.5-12.5-32.8-12.5-45.3 0l-38.3 38.3 39.2 39.2 38.3-38.3c12.5-12.5 12.5-32.8 0-45.3L223.1 128.4c-12.5-12.5-32.8-12.5-45.3 0l-38.3 38.3L64.5 315.2c-12.5 12.5-12.5 32.8 0 45.3l20.9 20.9 45.3-45.3-20.9-20.9 45.3-45.3L310.7 356.6c12.5 12.5 32.8 12.5 45.3 0l20.9-20.9c12.5-12.5 12.5-32.8 0-45.3z"
//   //       />
//   //     </svg>
//   //   </button>
//   // );
//   return (
//     <Link to={`/posts/${postId}`} >
//       <button
//         onClick={handleEdit}
//         aria-label="Edit post"
//         className="edit-button"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 448 512"
//           width="20px"
//           height="20px"
//           className="icon"
//         >
//           <path
//             d="M290.7 30.3c-12.5-12.5-32.8-12.5-45.3 0L80.1 178.2c-12.5 12.5-12.5 32.8 0 45.3l20.9 20.9 45.3-45.3-20.9-20.9L290.7 30.3zm-16.6 150.2L138.8 228.1 111.5 255.4l39.2 39.2 39.2-39.2-39.2-39.2zm50.7 182.3L328.1 128.4c-12.5-12.5-32.8-12.5 0l-38.3 38.3 39.2 39.2 38.3-38.3c12.5-12.5 12.5-32.8 0-45.3L223.1 128.4c-12.5-12.5-32.8-12.5-45.3 0l-38.3 38.3L64.5 315.2c-12.5 12.5-12.5 32.8 0 45.3l20.9 20.9 45.3-45.3-20.9-20.9 45.3-45.3L310.7 356.6c12.5 12.5 32.8 12.5 45.3 0l20.9-20.9c12.5-12.5 12.5-32.8 0-45.3zM290.7 30.3c-12.5-12.5-32.8-12.5-45.3 0L80.1 178.2c-12.5 12.5-12.5 32.8 0 45.3l20.9 20.9 45.3-45.3-20.9-20.9L290.7 30.3zm-16.6 150.2L138.8 228.1 111.5 255.4l39.2 39.2 39.2-39.2-39.2-39.2zm50.7 182.3L328.1 128.4c-12.5-12.5-32.8-12.5 0l-38.3 38.3 39.2 39.2 38.3-38.3c12.5-12.5 12.5-32.8 0-45.3L223.1 128.4c-12.5-12.5-32.8-12.5 0l-38.3 38.3L64.5 315.2c-12.5 12.5-12.5 32.8 0 45.3l20.9 20.9 45.3-45.3-20.9-20.9 45.3-45.3L310.7 356.6c12.5 12.5 32.8 12.5 45.3 0l20.9-20.9c12.5-12.5 12.5-32.8 0-45.3z"
//           />
//         </svg>
//       </button>
//     </Link>
//   );
// };

// import React from 'react';
// import './button.css';
// import { Link } from 'react-router-dom';

// interface EditButtonProps {
//   postId: string;
// }

// export const EditButton: React.FC<EditButtonProps> = ({ postId }) => {
//   return (
//     <Link to={`/posts/${postId}`} className="edit-button" aria-label="Edit post">
//       <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 448 512"
//     width="40px"
//     height="40px"
//     className="icon"
//     style={{ transform: 'rotateX(200deg) rotateY(210deg)' }}  >
//     <path
//       d="M290.7 30.3c-12.5-12.5-32.8-12.5-45.3 0L80.1 178.2c-12.5 12.5-12.5 32.8 0 45.3l20.9 20.9 45.3-45.3-20.9-20.9L290.7 30.3zm-16.6 150.2L138.8 228.1 111.5 255.4l39.2 39.2 39.2-39.2-39.2-39.2zm50.7 182.3L328.1 128.4c-12.5-12.5-32.8-12.5 0l-38.3 38.3 39.2 39.2 38.3-38.3c12.5-12.5 12.5-32.8 0-45.3L223.1 128.4c-12.5-12.5-32.8-12.5 0l-38.3 38.3L64.5 315.2c-12.5 12.5-12.5 32.8 0 45.3l20.9 20.9 45.3-45.3-20.9-20.9 45.3-45.3L310.7 356.6c12.5 12.5 32.8 12.5 45.3 0l20.9-20.9c12.5-12.5 12.5-32.8 0-45.3zM290.7 30.3c-12.5-12.5-32.8-12.5-45.3 0L80.1 178.2c-12.5 12.5-12.5 32.8 0 45.3l20.9 20.9 45.3-45.3-20.9-20.9L290.7 30.3zm-16.6 150.2L138.8 228.1 111.5 255.4l39.2 39.2 39.2-39.2-39.2-39.2zm50.7 182.3L328.1 128.4c-12.5-12.5-32.8-12.5 0l-38.3 38.3 39.2 39.2 38.3-38.3c12.5-12.5 12.5-32.8 0-45.3L223.1 128.4c-12.5-12.5-32.8-12.5 0l-38.3 38.3L64.5 315.2c-12.5 12.5-12.5 32.8 0 45.3l20.9 20.9 45.3-45.3-20.9-20.9 45.3-45.3L310.7 356.6c12.5 12.5 32.8 12.5 45.3 0l20.9-20.9c12.5-12.5 12.5-32.8 0-45.3z"
//     />
//   </svg>
//   <div className="tooltip-text">Post updaten</div>

//     </Link>
//   );
// };

import React from "react";
import { Link } from "react-router-dom";
import "./button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface EditButtonProps {
  postId: string;
  editPost: (postId: string) => void;
}

export const EditButton: React.FC<EditButtonProps> = ({ postId, editPost }) => {
  return (
    <div
      className="edit-button-container"
      onClick={(e) => {
        editPost(postId);
      }}
    >
      <Link
        to={`/posts/${postId}`}
        aria-label="Edit post"
        className="edit-button"
      >
        <FontAwesomeIcon icon={faPenToSquare} className="edit-button-icon" />
        <div className="edit-button-tooltip">Post bearbeiten</div>
      </Link>
    </div>
  );
};
