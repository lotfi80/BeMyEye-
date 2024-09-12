import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../context/CategoryUser";

import AccountButton from "./AccountButton/AccountButton";
import GetUsersWindow from "./GetUser/GetUsersWindow";
import MyCloseButton from "../MyCloseButton";
import Permission from "../Permission";
import Notification from "./PostNotification/Notification";
import NotifyMessages from "./NotifyMessages/NotifyMessages";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Blind from "../Blind";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  useClose,
  CloseButton,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { PopoverPaper } from "@mui/material";

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
    <header className="bg-white w-full py-4 shadow-md h-32 ">
      <nav
        aria-label="Global"
        className="mx-auto  self-center flex max-w-7xl items-center justify-between p-5 lg:px-20 "
      >
        <div className="flex lg:flex-1">
          <Link to="/home" className="-m-1.5 p-1.1">
            {/* <span className="sr-only">BeMyEye</span> */}
            <img
              alt=""
              src="/Screenshot from 2024-09-02 03-03-43.png"
              className="h-20 w-auto  "
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {/* <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              <Link to="/">Home</Link>
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4"></div>
            </PopoverPanel>
          </Popover> */}

          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
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
              className="flex items-center gap-x-1 text-sm font-semibold leading-6
             text-gray-900"
              onClick={(e) => {
                permission ? setShowTable(true) : setShowPermission(true);
              }}
            >
              Users
            </PopoverButton>
            <PopoverBackdrop className="fixed inset-0  backdrop-blur-sm backdrop-brightness-50" />
            <PopoverPanel
              transition
              style={{
                width: "70vw",
                height: "80vh",
                left: "15vw",
                top: "5rem",
              }}
              className="absolute 
              z-10
              mt-3
               overflow-y-auto rounded-3xl 
               bg-white shadow-lg ring-1 ring-gray-900/5
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

          {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Service
          </a> */}
          <Notification />
          <NotifyMessages />

          {user ? null : registrationStatus === "none" ? (
            <div className="flex flex-row gap-4">
              <div className="cursor-pointer">
                <Link
                  to={`/register`}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Register
                </Link>
              </div>
              <span>or</span>
              <div className=" cursor-pointer ">
                <Link
                  to={`/login`}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Login
                </Link>
              </div>
            </div>
          ) : registrationStatus === "registered" ? (
            <>
              <div className="cursor-pointer">
                <Link
                  to={`/login`}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Login
                </Link>
              </div>
            </>
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
