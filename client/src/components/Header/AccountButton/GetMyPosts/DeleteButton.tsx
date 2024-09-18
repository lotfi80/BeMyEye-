import React from "react";
import "./button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface DeleteButtonProps {
  postId: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ postId }) => {
  const deletePost = async (postId: string) => {
    try {
      console.log(`Post with id ${postId} deleted`);
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <div
      onClick={() => deletePost(postId)}
      style={{ cursor: "pointer" }}
      className="delete-button-container"
    >
      <FontAwesomeIcon
        className="delete-icon, delete-button-icon"
        icon={faTrashCan}
        size="2x"
      />
      <div className="delete-button-tooltip">Post löschen</div>
    </div>
  );
};
