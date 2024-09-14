import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IUser from "../../../interfaces/User";
import { IPost } from "../../../interfaces/Post";
import Blind from "../../Blind";
import CloseButton from "../../MyCloseButton";

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
            <ul className="flex flex-col gap-10 w-full">
              {posts &&
                posts.map((post, index) => (
                  <li
                    key={post._id}
                    onClick={(e) => handleOnPostClick(e, post)}
                    className="flex flex-row gap-10 "
                  >
                    {post.postimage && (
                      <img
                        src={`http://localhost:5000/${post.postimage[0].image}`}
                        alt="postimage"
                        className="max-w-24 max-h-24"
                      />
                    )}
                    <div className="flex flex-col gap-2 justify-start w-full">
                      <div className="flex flex-row justify-between">
                        <span className="text-decoration-line: underline decoration-slate-400 underline-offset-4">
                          {post.title}
                        </span>
                        <span>{post.userid.username}</span>
                      </div>
                      <span className="w-4/5">{post.description}</span>
                      <span>
                        <i>{post.address}</i>
                      </span>
                    </div>
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
