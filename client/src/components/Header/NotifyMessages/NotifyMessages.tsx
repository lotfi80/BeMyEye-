import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useCategoryUserContext } from "../../../context/CategoryUser";
import { getUserInbox } from "../../../http/api";
import IMessage from "../../../interfaces/Message";
import ListOfMessages from "./ListOfMessages";
import IncomingMessage from "./IncomingMessage";
import WriteMessage from "../WriteMessage";
import Blind from "../../Blind";

const Button: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();
  const [inbox, setInbox] = useState<IMessage[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<IMessage[]>([]);
  const [readedMessages, setReadedMessages] = useState<IMessage[]>([]);
  const [isListOfMessagesVisible, setIsListOfMessagesVisible] =
    useState<boolean>(false);
  const [isIncomingMessageWindowVisible, setIsIncomingMessageWindowVisible] =
    useState<boolean>(false);
  const [isOutgoingMessageWindowVisible, setIsOutgoingMessageWindowVisible] =
    useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<IMessage | null>(null);

  useEffect(() => {
    const unReadErstellen = async () => {
      try {
        if (!user) return;
        const inbox = await getUserInbox(user?._id);
        if (!inbox) return;
        setUnreadMessages(inbox.filter((msg: IMessage) => !msg.isRead));
        setReadedMessages(inbox.filter((msg: IMessage) => msg.isRead));
        setInbox(inbox);
      } catch (error) {
        console.error("Error fetching user inbox:", error);
      }
    };
    unReadErstellen();
  }, [user]);

  const handleNotificationClick = async () => {
    setIsListOfMessagesVisible(true);
  };

  return (
    <>
      <StyledWrapper>
        <button className="inbox-btn" onClick={handleNotificationClick}>
          <svg
            viewBox="0 0 512 512"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1
             29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 
             8.5 38.4 0L492.8 150.4c12.1-9.1
              19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0
               176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 
               64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
            />
          </svg>

          <span className="msg-count">{unreadMessages.length}</span>
          <span className="tooltip">
            You have {unreadMessages.length} unread messages{" "}
          </span>
        </button>
      </StyledWrapper>

      {isListOfMessagesVisible && (
        <ListOfMessages
          inbox={inbox}
          unreadMessages={unreadMessages}
          readedMessages={readedMessages}
          isListOfMessagesVisible={isListOfMessagesVisible}
          isIncomingMessageWindowVisible={isIncomingMessageWindowVisible}
          isOutgoingMessageWindowVisible={isOutgoingMessageWindowVisible}
          setIsListOfMessagesVisible={setIsListOfMessagesVisible}
          setIsIncomingMessageWindowVisible={setIsIncomingMessageWindowVisible}
          setIsOutgoingMessageWindowVisible={setIsOutgoingMessageWindowVisible}
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
        />
      )}
      {isIncomingMessageWindowVisible && (
        <IncomingMessage
          user={user}
          setUser={setUser}
          unreadMessages={unreadMessages}
          setUnreadMessages={setUnreadMessages}
          isListOfMessagesVisible={isListOfMessagesVisible}
          isIncomingMessageWindowVisible={isIncomingMessageWindowVisible}
          isOutgoingMessageWindowVisible={isOutgoingMessageWindowVisible}
          setIsListOfMessagesVisible={setIsListOfMessagesVisible}
          setIsIncomingMessageWindowVisible={setIsIncomingMessageWindowVisible}
          setIsOutgoingMessageWindowVisible={setIsOutgoingMessageWindowVisible}
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
        />
      )}
      {isOutgoingMessageWindowVisible && (
        <>
          <Blind />
          <WriteMessage
            currentRecipient={
              currentMessage?.sender ? currentMessage.sender : null
            }
            setLetterVisible={setIsOutgoingMessageWindowVisible}
          />
        </>
      )}
    </>
  );
};

const StyledWrapper = styled.div`
  .inbox-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    transition: all 0.3s;
  }
  .inbox-btn svg path {
    fill: green;
  }
  .inbox-btn svg {
    height: 20px;
    transition: all 0.3s;
  }
  .msg-count {
    position: absolute;
    top: 0;
    right: 2px;
    background-color: red;
    border-radius: 50%;
    font-size: 0.6em;
    color: white;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .inbox-btn:hover {
    transform: scale(1.1);
  }
  .tooltip {
    position: absolute;
    width: auto;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #646464;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.8em;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
  }
  .inbox-btn:hover .tooltip {
    visibility: visible;
    opacity: 0.8;
  }
  .inbox-btn {
    outline: none;
  }
`;

export default Button;
