import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryUserContext } from "../../context/CategoryUser";

import Permission from "../Permission";
import Notification from "./PostNotification/Notification";
import NotifyMessages from "./NotifyMessages/NotifyMessages";

import { PopoverGroup, Dialog } from "@headlessui/react";
import PostButton from "./PostButton";
import UsersButton from "./UsersButton";
import LoginBlock from "./LoginBlock";
import MyDialogPanel from "./MyDialogPanel";
import Burger from "../Burger";
import { useMediaQuery } from "react-responsive";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const handleOnBurgerClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setMobileMenuOpen(e.target.checked);
  };
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <header>
      <nav>
        <Link className="logo" to="/home">
          <img alt="" src="/logo3.png" />
        </Link>

        {isMobile && (
          <Burger
            handleOnBurgerClick={handleOnBurgerClick}
            isOpen={mobileMenuOpen}
          />
        )}

        <PopoverGroup className="popover-group-left">
          <PostButton
            permission={permission}
            setShowPermission={setShowPermission}
          />

          <UsersButton
            permission={permission}
            setShowPermission={setShowPermission}
            showTable={showTable}
            setShowTable={setShowTable}
          />
        </PopoverGroup>

        <Notification />
        <NotifyMessages />
        <LoginBlock />
        <Permission
          showPermission={showPermission}
          setShowPermission={setShowPermission}
        />
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <MyDialogPanel
          setMobileMenuOpen={setMobileMenuOpen}
          permission={permission}
          setShowPermission={setShowPermission}
          showTable={showTable}
          setShowTable={setShowTable}
        />
      </Dialog>
    </header>
  );
};

export default Header;
