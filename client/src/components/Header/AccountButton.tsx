import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../context/CategoryUser";
import Logout from "./Logout";

const Account: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPrivacy, setIsPrivacy] = useState(false);

  interface IInfoCheck {
    email: boolean;
    firstname: boolean;
    lastname: boolean;
    birthdate: boolean;
    country: boolean;
    city: boolean;
  }
  const [infoCheck, setInfoCheck] = useState<IInfoCheck>({
    email: true,
    firstname: true,
    lastname: true,
    birthdate: true,
    country: true,
    city: true,
  });

  const userImage = user?.profileimage?.includes("http")
    ? user?.profileimage
    : `http://localhost:5000/${user?.profileimage}`;

  const handleOnLinkClick = () => {
    setShowDropdown(true);
  };

  const handleCheckboxChange = (event: React.FormEvent, name: any) => {
    setInfoCheck({ ...infoCheck, [name]: !infoCheck[name] });
    console.log("HandleCheckboxChange: ", name);
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
          <div className="fixed text-black z-50 top-20 right-10 w-1/4 h-auto p-5 bg-white  shadow-md hover:text-black flex flex-col gap-5">
            <div className="flex flex-row gap-10 justify-evenly items-top">
              <img
                src={userImage}
                alt="profileimage"
                className="w-28 h-28 object-cover rounded-full "
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
                      checked={infoCheck.email}
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
                      checked={infoCheck.firstname}
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
                      checked={infoCheck.lastname}
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
                      checked={infoCheck.birthdate}
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
                      checked={infoCheck.country}
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
                      checked={infoCheck.city}
                      onChange={(e) => {
                        handleCheckboxChange(e, "city");
                      }}
                    />
                  </label>
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
