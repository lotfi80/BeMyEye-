import React, { useEffect } from "react";
import styled from "styled-components";
import IMessage from "../../../interfaces/Message";

interface props {
  message: IMessage;
}

const Li: React.FC<props> = ({ message }) => {
  function userImage(user: any): string {
    const userImage = user?.profileimage?.includes("http")
      ? user?.profileimage
      : `http://localhost:5000/${user?.profileimage}`;
    return userImage;
  }

  function formatDate(dateString: any): string {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  return (
    <>
      <li key={message._id} className="liLI">
        {message.sender?.profileimage && (
          <img src={userImage(message.sender)} alt="profileimage" />
        )}
        <span>{message.sender?.username}</span>
        <span>{message.subject}</span>
        <span>{formatDate(message.createdAt)}</span>
        <input
          className="messageListCheckbox"
          type="checkbox"
          name="check"
          id="check"
        />
      </li>
    </>
  );
};

export default Li;
