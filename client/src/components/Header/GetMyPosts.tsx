import React, { useState, useEffect } from "react";
import GetUsersPosts from "./GetUsersPosts";
import { useCategoryUserContext } from "../../context/CategoryUser";
import { getPostByUser } from "../../http/api";
import CloseButton from "../CloseButton";
import Blind from "../Blind";

const GetMyPosts: React.FC = () => {
  const [postsVisible, setPostsVisible] = useState<boolean>(false);
  const [tableVisible, setTableVisible] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]);
  const { user } = useCategoryUserContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("User:", user);
        if (user) {
          const userPosts = await getPostByUser(user._id);
          setPosts(userPosts.posts);
          console.log("User posts:", posts);
          console.log(postsVisible);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchPosts();
  }, [user]);

  return (
    <>
      <div
        className={` cursor-pointer`}
        onClick={(e) => {
          setPostsVisible(true);
        }}
      >
        Get My Posts
      </div>

      {postsVisible && (
        <>
          <Blind />
          <div className="fixed mr-0 top-0 right-0 w-full h-full flex justify-center items-center z-50">
            <div className="w-3/4 h-3/4 bg-white p-5 pt-20 shadow-md overflow-auto relative text-xs">
              <GetUsersPosts
                postsVisible={postsVisible}
                posts={posts}
                setPostsVisible={setPostsVisible}
                setTableVisible={setTableVisible}
              />
              <CloseButton setFunction={() => setPostsVisible(false)} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GetMyPosts;
