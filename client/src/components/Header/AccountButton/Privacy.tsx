import React, { useState } from "react";
import { useCategoryUserContext } from "../../../context/CategoryUser";
import { IUser } from "../../../interfaces/User";
import { getUserDataByID, userInContextUpdateRequest } from "../../../http/api";

interface props {
  isPrivacy: boolean;
  setIsPrivacy: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Privacy({ isPrivacy, setIsPrivacy }: props) {
  const { user, setUser } = useCategoryUserContext();
  const [wantChange, setWantChange] = useState(false);

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
        setWantChange(!wantChange);
        console.log("User data saved:", saveduser);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="flex flex-row  justify-start">
      <div
        className="w-1/3 cursor-pointer"
        onClick={(e) => setIsPrivacy(!isPrivacy)}
      >
        Privacy
      </div>
      {isPrivacy && (
        <div className="flex flex-col gap-2 text-sm">
          Display This Information to Other Users:
          <hr />
          <label htmlFor="email">
            Email
            <input
              className="ml-2"
              type="checkbox"
              name="email"
              id="email"
              checked={user?.privacy.email}
              disabled={!wantChange}
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
              disabled={!wantChange}
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
              disabled={!wantChange}
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
              disabled={!wantChange}
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
              disabled={!wantChange}
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
              disabled={!wantChange}
              onChange={(e) => {
                handleCheckboxChange(e, "city");
              }}
            />
          </label>
          <button
            type="button"
            className="border-2 border-green-500
                            hover:bg-green-500 hover:text-white rounded-md
                             active:bg-green-700"
            onClick={handleOnButtonClick}
          >
            {wantChange ? "Save" : "Change"}
          </button>
        </div>
      )}
    </div>
  );
}
