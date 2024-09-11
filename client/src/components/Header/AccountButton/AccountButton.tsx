import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../../context/CategoryUser";

import GetMyPosts from "./GetMyPosts/GetMyPosts";
import Following from "./Following";
import Privacy from "./Privacy";
import Logout from "./Logout";
import DeleteAcc from "./DeleteAcc";

import CloseButton from "../../CloseButton";
import Blind from "../../Blind";

import { IPost } from "../../../interfaces/Post";
import { getUsersPost } from "../../../http/api";

const Account: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();
  const [showDropdown, setShowDropdown] = useState(false);
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

  const handleOnLinkClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div
        className={`flex items-center space-x-2  cursor-pointer `}
        onClick={(e) => {
          setShowDropdown(!showDropdown);
        }}
      >
        <img
          src={userImage}
          alt="profileimage"
          className="w-12 h-12 object-cover rounded-full "
        />
        <p>{user?.username}</p>
      </div>
      {showDropdown && (
        <>
          <Blind />
          <div className="fixed text-black z-50 top-20 right-10 w-1/4 h-auto p-5 bg-white  shadow-md hover:text-black flex flex-col gap-3">
            <div className="flex flex-row gap-8 justify-evenly items-top">
              <CloseButton
                setFunction={() => {
                  setShowDropdown(!showDropdown);
                  setIsPrivacy(false);
                }}
              />

              <img
                src={userImage}
                alt="profileimage"
                className="w-24 h-24 object-cover rounded-full "
              />
              <div className="flex flex-col justify-evenly">
                <p className="text-2xl">{user?.username}</p>
                <p className="text-base">{`Posts: ${postCount}`}</p>{" "}
                <p className="text-base">Likes:</p>
              </div>
            </div>
            <hr />
            <GetMyPosts isMyPost={isMyPost} />
            <Following />
            <Link to={`/profile/${user?._id}`} onClick={handleOnLinkClick}>
              Profile
            </Link>
            <Privacy isPrivacy={isPrivacy} setIsPrivacy={setIsPrivacy} />
            <hr />
            <div className="grid grid-cols-2  justify-start">
              <Logout />
              <DeleteAcc />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
