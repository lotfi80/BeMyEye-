import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../context/CategoryUser";

import Account from "./Account";

const Header: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();
  const { registrationStatus, setRegistrationStatus } =
    useCategoryUserContext();

  useEffect(() => {
    console.log("User:", user);
    console.log("Registration status:", registrationStatus);
  }, [user, registrationStatus]);

  return (
    <header className="bg-white w-full py-4 shadow-md h-[15%]">
      <div className="flex justify-end mx-auto max-w-screen-xl">
        <ul className="flex space-x-10">
          <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer">
            <Link to="/posts">Posts</Link> {/* Verlinke zur Posts-Route */}
          </li>
          <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer">
            <Link to="/users">Users</Link>
          </li>
          <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer">
            <Link to="/logout">get my posts</Link>
          </li>
          <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer">
            <Link to="/logout">Logout</Link>
          </li>
          <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer">
            <Link to={`/profile/${user?._id}`}>My Profile</Link>
          </li>

          {user ? null : registrationStatus === "none" ? (
            <>
              <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-blue-300 hover:text-white cursor-pointer">
                <Link to={`/register`}>Register</Link>
              </li>
              <span>or</span>
              <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-blue-300 hover:text-white cursor-pointer">
                <Link to={`/login`}>Login</Link>
              </li>
            </>
          ) : registrationStatus === "registered" ? (
            <>
              <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-blue-300 hover:text-white cursor-pointer">
                <Link to={`/login`}>Login</Link>
              </li>
            </>
          ) : (
            <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-blue-300 hover:text-white cursor-pointer">
              <Account />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
