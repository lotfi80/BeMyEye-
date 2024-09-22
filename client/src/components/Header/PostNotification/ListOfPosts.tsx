import React from "react";
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

const ListOfPosts: React.FC<props> = ({ setIsListOfPostsVisible, posts }) => {
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
      <div className="notifyPostContainer ">
        <div className="notifyPostCard">
          <CloseButton setFunction={closeListOfMessages} />
          <h2>You follow:</h2>
          <hr />
          <ul>
            {posts &&
              posts.map((post, index) => (
                <li key={post._id} onClick={(e) => handleOnPostClick(e, post)}>
                  {post.postimage && (
                    <img
                      src={`http://localhost:5000/${post.postimage[0].image}`}
                      alt="postimage"
                      className="w-24"
                    />
                  )}
                  <div className="rightPanel">
                    <div>
                      <span>{post.title}</span>
                      <span>{post.userid?.username}</span>
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
    </>
  );
};

export default ListOfPosts;
