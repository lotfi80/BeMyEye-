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
      <StyledWrapper>
        <li key={message._id}>
          {message.sender?.profileimage && (
            <img src={userImage(message.sender)} alt="profileimage" />
          )}
          <span>{message.sender.username}</span>
          <span>{message.subject}</span>
          <span>{formatDate(message.createdAt)}</span>
          <input
            className="messageListCheckbox"
            type="checkbox"
            name="check"
            id="check"
          />
        </li>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  li {
    display: grid;
    grid-template-columns: 1fr 5fr 2fr;
    grid-template-rows: 1fr 1fr;
    align-items: start;
    justify-items: start;
    grid-template-areas:
      "img subject date"
      "img username checkbox";
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid green;
    column-gap: 10px;
  }
  li img {
    grid-area: img;
    width: 50px;
    height: 50px;
  }

  li span:nth-child(2) {
    grid-area: username;
  }
  li span:nth-child(3) {
    grid-area: subject;
    font-size: 1.2em;
    line-height: 1em;
    color: green;
  }
  li span:nth-child(4) {
    grid-area: date;
  }
  li .messageListCheckbox {
    grid-area: checkbox;
    width: 15px;
    height: 15px;
    justify-self: start;
    align-self: start;
  }
`;
export default Li;
