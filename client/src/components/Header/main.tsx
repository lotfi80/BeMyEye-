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
  Dialog,
  DialogPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Hamburger from "./Hamburger";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { registrationStatus, setRegistrationStatus } =
    useCategoryUserContext();

  const { user, setUser } = useCategoryUserContext();
  const [permission, setPermission] = useState(true);
  const [showPermission, setShowPermission] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const userImage = user?.profileimage?.includes("http")
    ? user?.profileimage
    : `http://localhost:5000/${user?.profileimage}`;

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
          <img alt="" src="/logoneu.png" width="100px" />
        </Link>

        <button
          className="hamburger"
          type="button"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon />
          <Hamburger mobileMenuOpen={mobileMenuOpen} />
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
        </PopoverGroup>

        <Notification />
        <NotifyMessages />

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
                  className="loginButtonImage -translate-y-1/4"
                />
                <p className="loginButtonName">{user?.username}</p>
              </PopoverButton>
            ) : null}
            <PopoverBackdrop className="popover-backdrop" />
            <PopoverPanel
              transition
              className="account-popover
               transition data-[closed]:translate-y-1
               data-[closed]:opacity-0 data-[enter]:duration-200
                data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in
                shadow-md hover:text-black"
            >
              <AccountButton />
            </PopoverPanel>
          </Popover>
        </PopoverGroup>

        <Permission
          showPermission={showPermission}
          setShowPermission={setShowPermission}
        />
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        {/* <div className="fixed inset-0 z-10" /> */}
        <DialogPanel className="dialog-panel sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">BeMyEye</span>
              <img
                alt=""
                src="/Screenshot 2024-09-02 03-03-43.png"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  to="/home"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home{" "}
                </Link>

                <Link
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  to="/posts"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Write Post!{" "}
                </Link>
                <Popover>
                  <PopoverButton
                    className="popover-button"
                    onClick={(e) => {
                      permission ? setShowTable(true) : setShowPermission(true);
                    }}
                  >
                    Get Users Info
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
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
