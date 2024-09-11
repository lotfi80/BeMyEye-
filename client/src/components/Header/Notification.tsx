import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCategoryUserContext } from "../../context/CategoryUser";
import { getUserDataByID } from "../../http/api";

const Button = () => {
  const { user } = useCategoryUserContext();
  const [postCount, setPostCount] = useState<number>(0);

  useEffect(() => {
    const getPostCount = async () => {
      try {
        if (!user) return;
        const userData = await getUserDataByID(user?._id);
        if (!userData) return;
        console.log("userNotification", userData);
        const postCount = userData.notifications.length;
        setPostCount(postCount);
      } catch (error) {
        console.error("Error fetching user inbox:", error);
      }
    };
    getPostCount();
  }, [user]);

  return (
    <StyledWrapper postCount={postCount}>
      <div className="notification">
        <div className="bell-container">
          <div className="bell" />
        </div>
        <span className="tooltip">Your followed users have new posts!</span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ postCount: number }>`
  .bell {
    border: 2.5px solid green;
    border-radius: 10px 10px 0 0;
    width: 17px;
    height: 19px;
    background: transparent;
    display: block;
    position: relative;
    top: -3px;
  }
  .bell::before,
  .bell::after {
    content: "";
    background: green;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 2.5px;
  }
  .bell::before {
    top: 100%;
    width: 20px;
  }
  .bell::after {
    top: calc(100% + 4px);
    width: 10px;
  }
  .notification {
    background: transparent;
    border: none;
    padding: 15px 15px;
    border-radius: 50px;
    cursor: pointer;
    transition: 300ms;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .notification::before {
    content: "${(props) => props.postCount}";
    color: white;
    font-size: 0.7em;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    right: 2px;
    top: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
  }
  .notification:hover {
    background: rgba(170, 170, 170, 0.062);
  }
  .notification:hover .bell-container {
    animation: bell-animation 650ms ease-out 0s 1 normal both;
  }
  @keyframes bell-animation {
    20% {
      transform: rotate(15deg);
    }
    40% {
      transform: rotate(-15deg);
      scale: 1.1;
    }
    60% {
      transform: rotate(10deg);
      scale: 1.1;
    }
    80% {
      transform: rotate(-10deg);
    }
    0%,
    100% {
      transform: rotate(0deg);
    }
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
    z-index: 30;
  }
  .notification:hover .tooltip {
    visibility: visible;
    opacity: 0.8;
  }
`;

export default Button;
