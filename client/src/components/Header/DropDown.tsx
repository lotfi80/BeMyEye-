import React, { useEffect } from "react";

export const DropDown = ({
  children,
  setIsDropDown,
  isDropDown,
  classes,
  dropdownRef,
}) => {
  return (
    <>
      {isDropDown && (
        <div ref={dropdownRef} className={classes}>
          {children}
        </div>
      )}
    </>
  );
};
