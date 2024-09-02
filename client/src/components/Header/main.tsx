import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../context/CategoryUser";

import AccountButton from "./AccountButton";
import GetUsers from "./GetUsers";

const Header: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();
  const { registrationStatus, setRegistrationStatus } =
    useCategoryUserContext();

  useEffect(() => {
    console.log("User:", user);
    console.log("Registration status:", registrationStatus);
  }, [user, registrationStatus]);

  return (
    <header className="bg-white w-full py-4 shadow-md h-[15%] ">
      <div className="flex gap-10 justify-end items-center mx-auto max-w-screen-xl ">
        <div className="mr-auto">
          <img
            src="../../../public/Screenshot from 2024-09-02 03-03-43.png"
            alt=""
            className="h-24 w-auto"
          />
        </div>
        {/* <div className="mr-auto text-3xl ">BeMyEye</div> */}

        <div
          className="bg-gray-200 text-black px-4 py-2  
        rounded-md hover:bg-black hover:text-white cursor-pointer"
        >
          <Link to="/">Home</Link>
        </div>

        <div className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer ">
          <Link to="/posts">Posts</Link> {/* Verlinke zur Posts-Route */}
        </div>

        <GetUsers />

        <div className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer">
          <Link to="/logout">get my posts</Link>
        </div>

        {user ? null : registrationStatus === "none" ? (
          <>
            <div className=" text-black px-4 py-2 rounded-md hover:bg-blue-300 hover:text-white cursor-pointer">
              <Link to={`/register`}>Register</Link>
            </div>
            <span>or</span>
            <div className=" text-black px-4 py-2 rounded-md hover:bg-blue-300 hover:text-white cursor-pointer ">
              <Link to={`/login`}>Login</Link>
            </div>
          </>
        ) : registrationStatus === "registered" ? (
          <>
            <div className=" text-black px-4 py-2 rounded-md hover:bg-blue-300 hover:text-white cursor-pointer">
              <Link to={`/login`}>Login</Link>
            </div>
          </>
        ) : null}
        {user ? <AccountButton /> : null}
      </div>
    </header>
  );
};

export default Header;
