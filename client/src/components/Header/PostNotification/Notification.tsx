import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCategoryUserContext } from "../../../context/CategoryUser";
import { getUserDataByID, getPostByID } from "../../../http/api";
import ListOfPosts from "./ListOfPosts";
import { IPost } from "../../../interfaces/Post";

const Notification: React.FC = () => {
  const { user } = useCategoryUserContext();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [postCount, setPostCount] = useState<number>(0);
  const [isListOfPostsVisible, setIsListOfPostsVisible] = useState(false);
  const [isPostWindowVisible, setIsPostWindowVisible] = useState(false);

  useEffect(() => {
    const getPostCount = async () => {
      try {
        if (!user) return;
        const userData = await getUserDataByID(user?._id);
        if (!userData) return;
        const postcount = userData.notifications.length;
        setPostCount(postcount);
        const waitPromise = userData.notifications.map(async (notification) => {
          const post = await getPostByID(notification);
          return post;
        });

        const fetchedPosts = await Promise.all(waitPromise);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching user inbox:", error);
      }
    };
    getPostCount();
  }, [user]);

  return (
    <StyledWrapper pcount={postCount}>
      <div
        className="notification"
        onClick={() => setIsListOfPostsVisible(true)}
      >
        <div className="bell-container">
          <div className="bell" />
        </div>
        <span className="tooltip">Your followed users have new posts!</span>
      </div>
      {isListOfPostsVisible && (
        <ListOfPosts
          isListOfPostsVisible={isListOfPostsVisible}
          setIsListOfPostsVisible={setIsListOfPostsVisible}
          isPostWindowVisible={isPostWindowVisible}
          setIsPostWindowVisible={setIsListOfPostsVisible}
          posts={posts}
        />
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ pcount: number }>`
  .notification::before {
    content: "${(props) => props.pcount}";
    color: white;
    font-size: 0.8em;
    font-weight: bold;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    right: 6px;
    top: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
`;

export default Notification;
