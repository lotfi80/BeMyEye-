import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../context/CategoryUser";

import AccountButton from "./AccountButton";
import GetUsers from "./GetUsers";
import Permission from "../Permission";
import Blind from "../Blind";

const Header: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();
  const { registrationStatus, setRegistrationStatus } =
    useCategoryUserContext();
  const [permission, setPermission] = useState(true);
  const [showPermission, setShowPermission] = useState(false);

  useEffect(() => {
    console.log("User:", user);
    console.log("Registration status:", registrationStatus);

    if (user === null) {
      setPermission(false);
    } else {
      setPermission(true);
    }
  }, [user]);

  console.log("Permission:", permission);
  console.log("Show permission:", showPermission);

  return (
    <header className="bg-white w-full py-4 shadow-md h-[15%] ">
      <div className="flex gap-10 justify-end items-center mx-auto max-w-screen-xl ">
        <div className="mr-auto">
          <Link to="/home">
            <img
              src="Screenshot from 2024-09-02 03-03-43.png"
              alt=""
              className="h-20 w-auto"
            />
          </Link>
        </div>

        {/* <div
          className="bg-gray-200 text-black px-4 py-2  
        rounded-md hover:bg-black hover:text-white cursor-pointer"
        >
          <Link to="/home">Home</Link>
        </div> */}

        <div className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer ">
          <Link
            to="/posts"
            onClick={(e) => {
              if (!permission) {
                e.preventDefault();
                setShowPermission(true);
              }
            }}
          >
            Posts
          </Link>
        </div>

        <GetUsers permission={permission} setPermission={setPermission} />

        <div className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer">
          <Link
            to="/logout"
            onClick={(e) => {
              if (!permission) {
                e.preventDefault();
                setShowPermission(true);
              }
            }}
          >
            get my posts
          </Link>
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
      <Permission
        showPermission={showPermission}
        setShowPermission={setShowPermission}
      />
    </header>
  );
};

export default Header;
