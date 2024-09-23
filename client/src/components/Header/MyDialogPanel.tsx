import React from "react";
import { Link } from "react-router-dom";
import { DialogPanel } from "@headlessui/react";
import AccountButton from "./AccountButton/AccountButton";
import UsersButton from "./UsersButton";

interface props {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  permission: boolean;
  setShowPermission: React.Dispatch<React.SetStateAction<boolean>>;
  showTable: boolean;
  setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
}
const MyDialogPanel: React.FC<props> = ({
  setMobileMenuOpen,
  permission,
  setShowPermission,
  showTable,
  setShowTable,
}) => {
  return (
    <DialogPanel className="dialog-panel sm:ring-1 sm:ring-gray-900/10">
      <div className="blockContainer">
        <Link
          className=" link"
          to="/home"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home{" "}
        </Link>

        <div>
          <Link
            className="link"
            to="/posts"
            onClick={() => setMobileMenuOpen(false)}
          >
            Write Post!{" "}
          </Link>
          <UsersButton
            permission={permission}
            setShowPermission={setShowPermission}
            showTable={showTable}
            setShowTable={setShowTable}
          />
        </div>
        <AccountButton setMobileMenuOpen={setMobileMenuOpen} />
      </div>
    </DialogPanel>
  );
};
export default MyDialogPanel;
