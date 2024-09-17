
import React from 'react';
import "./button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface DeleteButtonProps {
  postId: string;
  deletePost: (postId: string) => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ postId, deletePost }) => {
  return (
    <div 
      onClick={() => deletePost(postId)}
      style={{ cursor: 'pointer' }} 
      className="delete-button-container"
    >
      <FontAwesomeIcon className='delete-icon, delete-button-icon' icon={faTrashCan} size="2x" />
      <div className="delete-button-tooltip">
        Post löschen
      </div>
    </div>
  );
};


