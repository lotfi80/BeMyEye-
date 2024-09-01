import React from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../context/CategoryUser";

const Account: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();

  const userImage = user?.profileimage?.includes("http")
    ? user?.profileimage
    : `http://localhost:5000/${user?.profileimage}`;

  return (
    <a href={`/profile/${user?._id}`} className="flex items-center space-x-2">
      <img
        src={userImage}
        alt="profileimage"
        className="w-12 h-12 object-cover rounded-full "
      />
      <p>{user?.username}</p>
    </a>
  );
};

export default Account;
