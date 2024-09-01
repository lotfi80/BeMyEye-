import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../context/CategoryUser";

import Account from "./Account";
import Logout from "./Logout";

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
      <ul className="flex space-x-10 justify-end items-center mx-auto max-w-screen-xl">
        <div className="mr-auto text-3xl">BeMyEye</div>

        <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer ">
          <Link to="/posts">Posts</Link> {/* Verlinke zur Posts-Route */}
        </li>
        <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer">
          <Link to="/users">Users</Link>
        </li>
        <li className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer">
          <Link to="/logout">get my posts</Link>
        </li>

        <li className=" text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer ">
          <Logout />
        </li>

        {user ? null : registrationStatus === "none" ? (
          <>
            <li className=" text-black px-4 py-2 rounded-md hover:bg-blue-300 hover:text-white cursor-pointer">
              <Link to={`/register`}>Register</Link>
            </li>
            <span>or</span>
            <li className=" text-black px-4 py-2 rounded-md hover:bg-blue-300 hover:text-white cursor-pointer ">
              <Link to={`/login`}>Login</Link>
            </li>
          </>
        ) : registrationStatus === "registered" ? (
          <>
            <li className=" text-black px-4 py-2 rounded-md hover:bg-blue-300 hover:text-white cursor-pointer">
              <Link to={`/login`}>Login</Link>
            </li>
          </>
        ) : null}
        {user ? (
          <li className=" text-black px-4 py-2 rounded-lg bg-gray-100  hover:bg-blue-300 hover:text-white cursor-pointer ">
            <Account />
          </li>
        ) : null}
      </ul>
    </header>
  );
};

export default Header;
