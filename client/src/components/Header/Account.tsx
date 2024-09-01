import React from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../context/CategoryUser";

const Account: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();
  return (
    <div>
      <Link to={`/profile/${user?._id}`}>Profile</Link>
    </div>
  );
};

export default Account;
