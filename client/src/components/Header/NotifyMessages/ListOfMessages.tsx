import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IMessage from "../../../interfaces/Message";
import IUser from "../../../interfaces/User";
import Blind from "../../Blind";
import CloseButton from "../../MyCloseButton";
import SortButton from "./SortButton";
import Li from "./Li";
import SearchMessages from "./SearchMessages";

interface props {
  unreadMessages: IMessage[] | null;
  readedMessages: IMessage[] | null;
  inbox: IMessage[] | null;
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

const ListOfMessages: React.FC<props> = ({
  unreadMessages,
  readedMessages,
  inbox,
  currentMessage,
  setCurrentMessage,
  isListOfMessagesVisible,
  isIncomingMessageWindowVisible,
  isOutgoingMessageWindowVisible,
  setIsListOfMessagesVisible,
  setIsIncomingMessageWindowVisible,
  setIsOutgoingMessageWindowVisible,
}) => {
  const [writeInSearchBarResults, setWriteInSearchBarResults] = useState<any[]>(
    []
  );
  const [searchResults, setSearchResults] = useState<IMessage[]>([]);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  console.log("ListOfMessages.tsx: unreadMessages:", unreadMessages);

  function closeListOfMessages() {
    setIsListOfMessagesVisible(false);
  }

  function handleOnMessageClick(
    e: React.MouseEvent<HTMLLIElement>,
    message: IMessage
  ): void {
    e.preventDefault();
    setIsIncomingMessageWindowVisible(true);
    setIsListOfMessagesVisible(false);
    setCurrentMessage(message);
  }

  const [sortedMessages, setSortedMessages] = useState<IMessage[]>([]);
  if (sortedMessages.length === 0 && unreadMessages) {
    setSortedMessages(unreadMessages);
  }
  const arrayForMessages = isSearchActive
    ? searchResults.slice(0)
    : sortedMessages.slice(0);

  return (
    <>
      <Blind />
      <div className="notifyPostContainer">
        <div className="notifyPostCard msg">
          <SearchMessages
            inbox={inbox}
            setIsSearchActive={setIsSearchActive}
            isSearchActive={isSearchActive}
            setWriteInSearchBarResults={setWriteInSearchBarResults}
            writeInSearchBarResults={writeInSearchBarResults}
            setSearchResults={setSearchResults}
          />

          <SortButton setSortedMessages={setSortedMessages} inbox={inbox} />
          <CloseButton setFunction={closeListOfMessages} />
          <h2>Your messages:</h2>
          <hr />
          <ul>
            {arrayForMessages
              ?.filter((message) => unreadMessages?.includes(message))
              .map((message) => (
                <li onClick={(e) => handleOnMessageClick(e, message)}>
                  <Li message={message} />
                </li>
              ))}

            {arrayForMessages
              ?.filter((message) => readedMessages?.includes(message))
              .map((message) => (
                <li
                  className="readed"
                  onClick={(e) => handleOnMessageClick(e, message)}
                >
                  <Li message={message} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListOfMessages;
