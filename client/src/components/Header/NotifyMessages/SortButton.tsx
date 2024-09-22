import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IMessage from "../../../interfaces/Message";
import IUser from "../../../interfaces/User";

interface props {
  setSortedMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  inbox: IMessage[] | null;
}

const SortButton: React.FC<props> = ({ setSortedMessages, inbox }) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("username");

  useEffect(() => {
    inbox?.map(
      (message: IMessage) =>
        (message.username = message.sender?.username
          ? message.sender.username
          : "z")
    );
  }, []);

  useEffect(() => {
    console.log("Sorting", inbox);
    sortData(inbox);
  }, [order, orderBy]);

  const sortData = (messages: any) => {
    const sorted = messages.slice().sort((a, b) => {
      console.log(a[orderBy], b[orderBy]);

      if (typeof a[orderBy] === "string" && typeof b[orderBy] === "string") {
        if (order === "asc") {
          return a[orderBy].localeCompare(b[orderBy]);
        }
        return b[orderBy].localeCompare(a[orderBy]);
      }
      if (orderBy === "createdAt") {
        const dateA = new Date(a[orderBy]).getTime();
        const dateB = new Date(b[orderBy]).getTime();

        if (order === "asc") {
          return dateA - dateB;
        }
        return dateB - dateA;
      }
      // return 0;
    });
    setSortedMessages(sorted);
  };

  return (
    <label className="popup">
      <input type="checkbox" />
      <div className="burger" tabIndex={0}>
        <span />
        <span />
        <span />
      </div>
      <nav className="popup-window">
        <legend>Sort by:</legend>
        <ul>
          <li>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setOrderBy("createdAt");
                setOrder("desc");
              }}
            >
              <span>From newest to oldest</span>
            </button>
          </li>
          <li>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setOrderBy("createdAt");
                setOrder("asc");
              }}
            >
              <span>From oldest to newest</span>
            </button>
          </li>
          <hr />
          <li>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setOrderBy("username");
                setOrder("asc");
              }}
            >
              <span>By sender name</span>
            </button>
          </li>
          <li>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setOrderBy("subject");
                setOrder("asc");
              }}
            >
              <span>By subject (alphabetically)</span>
            </button>
          </li>
          <hr />
        </ul>
      </nav>
    </label>
  );
};

export default SortButton;
