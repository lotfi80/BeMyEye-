import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../context/CategoryUser";

import AccountButton from "./AccountButton/AccountButton";
import GetUsersWindow from "./GetUser/GetUsersWindow";
import Permission from "../Permission";
import Notification from "./PostNotification/Notification";
import NotifyMessages from "./NotifyMessages/NotifyMessages";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { group } from "console";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { registrationStatus, setRegistrationStatus } =
    useCategoryUserContext();

  const { user, setUser } = useCategoryUserContext();
  const [permission, setPermission] = useState(true);
  const [showPermission, setShowPermission] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (user === null) {
      setPermission(false);
    } else {
      setPermission(true);
    }
  }, [user]);

  return (
    <header>
      <nav>
        <Link className="logo" to="/home">
          <img
            alt=""
            src="/Screenshot from 2024-09-02 03-03-43.png"
            width="100px"
          />
        </Link>

        <button
          className="hamburger"
          type="button"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon />
        </button>

        <PopoverGroup className="popover-group-left">
          <Popover>
            <PopoverButton className="popover-button">
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
            </PopoverButton>
          </Popover>

          <Popover>
            <PopoverButton
              className="popover-button"
              onClick={(e) => {
                permission ? setShowTable(true) : setShowPermission(true);
              }}
            >
              Users
            </PopoverButton>
            <PopoverBackdrop className="popover-backdrop" />
            <PopoverPanel
              transition
              className="popover-panel
               transition data-[closed]:translate-y-1
               data-[closed]:opacity-0 data-[enter]:duration-200
                data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {showTable && <GetUsersWindow />}
              {showPermission && (
                <Permission
                  showPermission={showPermission}
                  setShowPermission={setShowPermission}
                />
              )}
            </PopoverPanel>
          </Popover>

          <Notification />
          <NotifyMessages />
        </PopoverGroup>

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
            <PopoverButton></PopoverButton>
            <PopoverBackdrop className="fixed inset-0  backdrop-blur-sm backdrop-brightness-50" />
            <PopoverPanel></PopoverPanel>
          </Popover>
          {user ? <AccountButton /> : null}
        </PopoverGroup>

        <Permission
          showPermission={showPermission}
          setShowPermission={setShowPermission}
        />
      </nav>
    </header>
  );
};

export default Header;
