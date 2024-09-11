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
    console.log("Sorting", inbox);
    sortData(inbox);
  }, [order, orderBy]);

  const sortData = (messages: any) => {
    const sorted = messages.slice().sort((a, b) => {
      if (!a[orderBy] && b[orderBy]) return 1;
      if (a[orderBy] && !b[orderBy]) return -1;
      if (!a[orderBy] && !b[orderBy]) return 0;

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
      return 0;
    });
    setSortedMessages(sorted);
  };

  return (
    <StyledWrapper>
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
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .popup {
    display: block;
    position: relative;
    float: right;
    margin-bottom: 10px;
  }

  .popup input {
    display: none;
  }

  .burger {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2.2em;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.1s ease-in-out;
    outline: none;
  }

  .burger span {
    height: 0.1em;
    width: 1.5em;
    background: gray;
    position: absolute;
    transition: 0.3s;
  }

  .burger span:nth-child(1) {
    top: 0.6em;
  }

  .burger span:nth-child(2) {
    bottom: 0.6em;
  }

  .burger span:nth-child(3) {
    top: 50%;
    transform: translateY(-50%);
  }

  .popup-window {
    transform: scale(0.5);
    visibility: hidden;
    opacity: 0;
    position: absolute;

    padding: 1em;
    background: #e4e4e4;
    color: #000000da;
    border-radius: 0.4em;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    top: 2em;
    right: 0;
    transition: all 0.1s ease-in-out;
  }

  .popup-window legend {
    padding: 5px;
    margin: 0;
    color: gray;
    font-size: 0.6em;
    text-transform: uppercase;
  }

  .popup-window ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .popup-window ul button {
    outline: none;
    width: 100%;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    color: #515151;
    font-size: 0.8em;
    margin-bottom: 15px;
    /* padding: 5px 10px; */
    white-space: nowrap;
    cursor: pointer;
    column-gap: 15px;
  }

  .popup-window ul button:hover {
    color: white;
    background: green;
  }

  .burger:hover {
    transform: scale(1.1);
  }

  .burger:active {
    transform: scale(0.9);
  }

  .popup input:checked + .burger span:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  .popup input:checked + .burger span:nth-child(2) {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
  }

  .popup input:checked + .burger span:nth-child(3) {
    opacity: 0;
  }

  .popup input:checked ~ nav {
    transform: scale(1);
    visibility: visible;
    opacity: 1;
  }
`;

export default SortButton;
