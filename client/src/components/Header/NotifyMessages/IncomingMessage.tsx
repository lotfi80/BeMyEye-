import React, { useEffect } from "react";
import styled from "styled-components";
import IMessage from "../../../interfaces/Message";
import IUser from "../../../interfaces/User";
import Blind from "../../Blind";
import CloseButton from "../../CloseButton";
import WriteMessage from "../WriteMessage";
import { markAsRead } from "../../../http/api";

interface props {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  unreadMessages: IMessage[] | null;
  setUnreadMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  currentMessage: IMessage | null;
  setCurrentMessage: React.Dispatch<React.SetStateAction<IMessage | null>>;
  isListOfMessagesVisible: boolean;
  setIsListOfMessagesVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isIncomingMessageWindowVisible: boolean;
  setIsIncomingMessageWindowVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isOutgoingMessageWindowVisible: boolean;
  setIsOutgoingMessageWindowVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const IncomingMessage: React.FC<props> = ({
  user,
  setUser,
  unreadMessages,
  setUnreadMessages,
  currentMessage,
  setCurrentMessage,
  isListOfMessagesVisible,
  isIncomingMessageWindowVisible,
  isOutgoingMessageWindowVisible,
  setIsListOfMessagesVisible,
  setIsIncomingMessageWindowVisible,
  setIsOutgoingMessageWindowVisible,
}) => {
  function closeIncomingMessageWindow() {
    setIsIncomingMessageWindowVisible(false);
    setIsListOfMessagesVisible(true);
  }

  function handleClickReplayButton() {
    setIsIncomingMessageWindowVisible(false);
    setIsListOfMessagesVisible(false);
    setIsOutgoingMessageWindowVisible(true);
  }

  useEffect(() => {
    async function isReadMessage(currentMessage: IMessage | null) {
      if (currentMessage) {
        setCurrentMessage({ ...currentMessage, isRead: true });
        try {
          await markAsRead(currentMessage?._id);
        } catch (error) {
          console.error("Error updating message:", error);
        }
        if (user)
          setUser((prev: IUser | any) => ({
            ...prev!,
            ...prev.inbox!.filter(
              (message: any) => message.sender === message.user
            ),
            isRead: true,
          }));
      }
    }
    setUnreadMessages((prev: IMessage[] | any) => ({
      ...prev!,
      ...currentMessage,
    }));
    isReadMessage(currentMessage);
  }, []);

  return (
    <>
      <Blind />
      <StyledWrapper>
        <div
          className="fixed mr-0 top-0 right-0 left-0 
                              bottom-0 z-50 flex justify-center "
        >
          <div className="w-1/2 h-3/4 bg-white absolute top-20 z-60 p-10 overflow-y-auto">
            <CloseButton setFunction={closeIncomingMessageWindow} />
            <span className="sender">
              <h2>From:</h2>
              <p>{currentMessage?.sender.username}</p>
            </span>
            <hr />
            <div className="tocopy">
              <span className="recipient">
                <h2>To:</h2>
                <p>{user?.username}</p>
              </span>
              <span className="recipient">
                <h2>Copy:</h2>
                {currentMessage?.recipient.map((recipient) => {
                  if (recipient._id !== user?._id) {
                    if (!recipient.username) recipient.username = "incognito";
                    return (
                      <p key={recipient._id}>
                        {recipient.username},{""}
                      </p>
                    );
                  }
                  return null;
                })}
              </span>
            </div>
            <hr />
            <span className="subject">
              <h2>Subject:</h2>
              <p>{currentMessage?.subject}</p>
            </span>
            <hr />
            <div className="content_container">
              <div className="content">{currentMessage?.message}</div>
              <div className="attachment">
                {currentMessage?.attachments.map((attachment) => (
                  <img src={`http://localhost:5000${attachment}`} alt="img" />
                ))}
              </div>
            </div>
            <div className="messageFooter" onClick={handleClickReplayButton}>
              <button className="button">Reply</button>
            </div>
          </div>
        </div>
      </StyledWrapper>
    </>
  );
};
const StyledWrapper = styled.div`
  hr {
    margin-bottom: 20px;
  }
  div.tocopy {
    display: grid;
    grid-template-columns: 2fr 3fr;
    justify-content: start;
  }
  .sender,
  .recipient,
  .subject {
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 10px;
  }
  .recipient {
    flex-wrap: wrap;
  }
  .sender p,
  .recipient p {
    font-style: italic;
  }

  .subject p {
    font-weight: bold;
  }
  .content {
    margin: 20px;
    overflow-y: auto;
  }
  .content_container {
    height: 1/2;
  }
  .messageFooter {
    height: 50px;
  }
  .button:hover {
    background-color: green;
  }
  .attachment {
    display: flex;
    flex-flow: row wrap;

    /* flex-wrap: wrap; */
    gap: 10px;
  }
  .attachment img {
    max-width: 200px;
    height: auto;
    margin-bottom: 20px;
  }
`;
export default IncomingMessage;
