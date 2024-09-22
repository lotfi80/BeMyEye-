import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../context/CategoryUser";

import {
  PopoverGroup,
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from "@headlessui/react";
import AccountButton from "./AccountButton/AccountButton";

const LoginBlock: React.FC = () => {
  const { registrationStatus, setRegistrationStatus } =
    useCategoryUserContext();

  const { user, setUser } = useCategoryUserContext();
  const [isAccountClosed, setIsAccountClosed] = useState(true);

  const userImage = user?.profileimage?.includes("http")
    ? user?.profileimage
    : `http://localhost:5000/${user?.profileimage}`;
  return (
    <PopoverGroup className="popover-group-right">
      {user ? null : registrationStatus === "none" ? (
        <div className="registration-login-block">
          <Link to={`/register`} className="popover-button">
            Register
          </Link>
          <span>or</span>
          <Link to={`/login`} className="popover-button">
            Login
          </Link>
        </div>
      ) : registrationStatus === "registered" ? (
        <Link to={`/login`} className="popover-button">
          Login
        </Link>
      ) : null}

      <Popover>
        {user ? (
          <PopoverButton className="popover-button">
            <img
              src={userImage}
              alt="profileimage"
              className="loginButtonImage"
            />
            <p className="loginButtonName">{user?.username}</p>
          </PopoverButton>
        ) : null}
        {isAccountClosed ? null : (
          <PopoverBackdrop className="popover-backdrop" />
        )}
        <PopoverPanel
          transition
          className="account-popover
           transition data-[closed]:translate-y-1
           data-[closed]:opacity-0 data-[enter]:duration-200
            data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in
            shadow-md hover:text-black"
        >
          <AccountButton setIsAccountClosed={setIsAccountClosed} />
        </PopoverPanel>
      </Popover>
    </PopoverGroup>
  );
};
export default LoginBlock;
