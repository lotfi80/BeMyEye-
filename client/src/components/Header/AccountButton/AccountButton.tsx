import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../../context/CategoryUser";

import GetMyPosts from "./GetMyPosts/GetMyPosts";
import Following from "./Following";
import Privacy from "./Privacy";
import Logout from "./Logout";
import DeleteAcc from "./DeleteAcc";

import { IPost } from "../../../interfaces/Post";
import { getUsersPost } from "../../../http/api";
const Account: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();
  const [isPrivacy, setIsPrivacy] = useState(false);
  const [postCount, setPostCount] = useState<number>(0);
  const [isMyPost, setIsMyPost] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostsCount = async () => {
      try {
        if (user) {
          const userPosts: IPost[] = await getUsersPost(user._id);
          const count: number = userPosts.length;
          setPostCount(count);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchPostsCount();
  }, []);

  const userImage = user?.profileimage?.includes("http")
    ? user?.profileimage
    : `http://localhost:5000/${user?.profileimage}`;

  return (
    <>
      <div className="account-panel">
        <img src={userImage} alt="profileimage" />
        <div className="top-right">
          <p>{user?.username}</p>
          <p>{`Posts: ${postCount}`}</p> <p>{"Likes:"}</p>
        </div>
      </div>
      <hr />
      <div className="middle">
        <GetMyPosts isMyPost={isMyPost} />
        <Following />
        <Link
          className="linkToProfile"
          to={`/profile/${user?._id}`}
          onClick={() => {
            setIsMyPost(false);
          }}
        >
          Profile
        </Link>
        <Privacy isPrivacy={isPrivacy} setIsPrivacy={setIsPrivacy} />
      </div>
      <hr />
      <div className="grid grid-cols-2  justify-start">
        <Logout />
        <DeleteAcc />
      </div>
    </>
  );
};

export default Account;
