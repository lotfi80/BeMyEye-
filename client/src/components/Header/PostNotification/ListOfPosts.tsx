import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IUser from "../../../interfaces/User";
import { IPost } from "../../../interfaces/Post";
import Blind from "../../Blind";
import CloseButton from "../../CloseButton";

interface props {
  isListOfPostsVisible: boolean;
  setIsListOfPostsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isPostWindowVisible: boolean;
  setIsPostWindowVisible: React.Dispatch<React.SetStateAction<boolean>>;
  posts: IPost[] | null;
}

const ListOfPosts: React.FC<props> = ({
  isListOfPostsVisible,
  setIsListOfPostsVisible,
  posts,
}) => {
  function closeListOfMessages() {
    setIsListOfPostsVisible(false);
  }

  function handleOnPostClick(
    e: React.MouseEvent<HTMLLIElement>,
    post: IPost
  ): void {
    e.preventDefault();
    // setIsPostWindowVisible(true);
    setIsListOfPostsVisible(false);
    // setCurrentPost(post);
  }
  console.log("onPostClick", posts);
  return (
    <>
      <Blind />
      <StyledWrapper>
        <div
          className="fixed mr-0 top-0 right-0 left-0 
                      bottom-0 z-50 flex justify-center "
        >
          <div className="w-1/2 h-2/3 bg-white absolute top-20 z-60 p-10 overflow-y-auto">
            <CloseButton setFunction={closeListOfMessages} />
            <h2>You follow:</h2>
            <hr />
            <ul>
              {posts &&
                posts.map((post) => (
                  <li
                    key={post._id}
                    onClick={(e) => handleOnPostClick(e, post)}
                  >
                    {post.postimage && (
                      <img
                        src={`http://localhost:5000/${post.postimage.image}`}
                        alt="postimage"
                      />
                    )}
                    <span>{post.title}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  ul {
    margin-top: 20px;

    list-style-type: none;
    font-size: 14px;
  }
  div.readed li {
    background-color: #78a4784e;
  }
`;
export default ListOfPosts;
