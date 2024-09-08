import React, { useState, useEffect } from "react";
import GetUsersPosts from "../../GetUser/GetUsersPosts";
import { useCategoryUserContext } from "../../../../context/CategoryUser";
import { getUsersPost } from "../../../../http/api";
import CloseButton from "../../../CloseButton";
import Blind from "../../../Blind";

interface props {
  isMyPost: boolean;
}

const GetMyPosts: React.FC<props> = ({ isMyPost }) => {
  const [postsVisible, setPostsVisible] = useState<boolean>(false);
  const [tableVisible, setTableVisible] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]);
  const { user } = useCategoryUserContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("User:", user);
        if (user) {
          const userPosts = await getUsersPost(user._id);
          setPosts(userPosts);
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
        My Posts
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
                isMyPost={isMyPost}
              />
              <CloseButton
                setFunction={() => {
                  setPostsVisible(false);
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GetMyPosts;
