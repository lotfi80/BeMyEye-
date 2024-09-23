import React, { useState } from "react";

import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from "@headlessui/react";
import GetUsersWindow from "./GetUser/GetUsersWindow";

interface props {
  permission: boolean;
  setShowPermission: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
  showTable: boolean;
}

const PostButton: React.FC<props> = ({
  permission,
  setShowPermission,
  showTable,
  setShowTable,
}) => {
  return (
    <Popover>
      <PopoverButton
        className="popover-button "
        onClick={(e) => {
          permission ? setShowTable(true) : setShowPermission(true);
        }}
      >
        Users
      </PopoverButton>
      <PopoverBackdrop className="popover-backdrop" />
      <PopoverPanel
        transition
        className="popover-panel users-popover-panel
               transition data-[closed]:translate-y-1
               data-[closed]:opacity-0 data-[enter]:duration-200
                data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {showTable && <GetUsersWindow />}
      </PopoverPanel>
    </Popover>
  );
};
export default PostButton;
