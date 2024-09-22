import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Popover, PopoverButton } from "@headlessui/react";

interface props {
  permission: boolean;
  setShowPermission: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostButton: React.FC<props> = ({ permission, setShowPermission }) => {
  const navigate = useNavigate();
  return (
    <Popover>
      <PopoverButton
        className="popover-button"
        onClick={(e) => {
          permission ? navigate("/posts") : setShowPermission(true);
        }}
      >
        Post!
      </PopoverButton>
    </Popover>
  );
};
export default PostButton;
