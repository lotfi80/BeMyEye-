import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../context/CategoryUser";
import Logout from "./Logout";
import CloseButton from "../CloseButton";
import { IUser } from "../../interfaces/User";
import { userInContextUpdateRequest, getUserDataByID } from "../../http/api";

const Account: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPrivacy, setIsPrivacy] = useState(false);

  const userImage = user?.profileimage?.includes("http")
    ? user?.profileimage
    : `http://localhost:5000/${user?.profileimage}`;

  const handleOnLinkClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof IUser["privacy"]
  ) => {
    setUser((prev: IUser | any) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [name]: !prev.privacy[name],
      },
    }));
    console.log("User:", user?.privacy);
  };

  const handleOnButtonClick = async () => {
    try {
      if (user) {
        await userInContextUpdateRequest(user._id, user);
        console.log("User data submitted:", user.privacy);
        const saveduser = await getUserDataByID(user._id);
        console.log("User data saved:", saveduser);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        className={`flex items-center space-x-2 relative cursor-pointer `}
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
          <div className="fixed mr-0 top-0 right-0 left-0 bottom-0 z-40 backdrop-blur-sm backdrop-brightness-50"></div>

          <div className="fixed text-black z-50 top-20 right-10 w-1/4 h-auto p-5 bg-white  shadow-md hover:text-black flex flex-col gap-3">
            <div className="flex flex-row gap-8 justify-evenly items-top">
              <CloseButton setFunction={() => setShowDropdown(!showDropdown)} />

              <img
                src={userImage}
                alt="profileimage"
                className="w-24 h-24 object-cover rounded-full "
              />
              <div className="flex flex-col justify-evenly">
                <p className="text-2xl">{user?.username}</p>
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
            <div className="flex flex-row  justify-start">
              <div className="w-1/3" onClick={(e) => setIsPrivacy(!isPrivacy)}>
                Privacy
              </div>
              {isPrivacy && (
                <div className="flex flex-col gap-2 text-sm">
                  Display This Information to Other Users:
                  <label htmlFor="email">
                    Email
                    <input
                      className="ml-2"
                      type="checkbox"
                      name="email"
                      id="email"
                      checked={user?.privacy.email}
                      onChange={(e) => {
                        handleCheckboxChange(e, `email`);
                      }}
                    />
                  </label>
                  <label htmlFor="firstname">
                    Firstname
                    <input
                      className="ml-2"
                      type="checkbox"
                      name="firstname"
                      id="firstname"
                      checked={user?.privacy.firstname}
                      onChange={(e) => {
                        handleCheckboxChange(e, "firstname");
                      }}
                    />
                  </label>
                  <label htmlFor="lastname">
                    Lastname
                    <input
                      className="ml-2"
                      type="checkbox"
                      name="lastname"
                      id="lastname"
                      checked={user?.privacy.lastname}
                      onChange={(e) => {
                        handleCheckboxChange(e, "lastname");
                      }}
                    />
                  </label>
                  <label htmlFor="birthdate">
                    Birthday
                    <input
                      className="ml-2"
                      type="checkbox"
                      name="birthdate"
                      id="birthdate"
                      checked={user?.privacy.birthdate}
                      onChange={(e) => {
                        handleCheckboxChange(e, "birthdate");
                      }}
                    />
                  </label>
                  <label htmlFor="country">
                    Country
                    <input
                      className="ml-2"
                      type="checkbox"
                      name="country"
                      id="country"
                      checked={user?.privacy.country}
                      onChange={(e) => {
                        handleCheckboxChange(e, "country");
                      }}
                    />
                  </label>
                  <label htmlFor="city">
                    City
                    <input
                      className="ml-2"
                      type="checkbox"
                      name="city"
                      id="city"
                      checked={user?.privacy.city}
                      onChange={(e) => {
                        handleCheckboxChange(e, "city");
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="border border-1 border-green-800"
                    onClick={handleOnButtonClick}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
            <hr />
            <Logout />
          </div>
        </>
      )}
    </>
  );
};

export default Account;
