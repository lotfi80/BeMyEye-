import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../context/CategoryUser";
import Logout from "./Logout";

const Account: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const userImage = user?.profileimage?.includes("http")
    ? user?.profileimage
    : `http://localhost:5000/${user?.profileimage}`;

  const handleOnLinkClick = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <div
        className={`flex items-center space-x-2 relative cursor-pointer ${
          showDropdown ? "z-50" : ""
        }`}
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
          <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-80 "></div>
          <div className="fixed text-black z-50 top-32 right-10 w-1/4 h-auto p-5 bg-white  shadow-md hover:text-black flex flex-col gap-5">
            <div className="flex flex-row gap-10 justify-evenly items-top">
              <img
                src={userImage}
                alt="profileimage"
                className="w-32 h-32 object-cover rounded-full "
              />
              <div className="flex flex-col justify-evenly">
                <p className="text-3xl">{user?.username}</p>
                <p className="text-xl">{`Posts: ${user?.birthdate}`}</p>{" "}
                {/* Hier wird das posts anzahl angezeigt */}
                <p className="text-xl">Likes:</p>
              </div>
            </div>
            <hr />
            <Link to={`/profile/${user?._id}`} onClick={handleOnLinkClick}>
              My Posts
            </Link>
            <Link to="/location" onClick={handleOnLinkClick}>
              My Location
            </Link>
            <Link to={`/profile/${user?._id}`} onClick={handleOnLinkClick}>
              Profile
            </Link>
            <hr />
            <Logout />
          </div>
        </>
      )}
    </>
  );
};

export default Account;
