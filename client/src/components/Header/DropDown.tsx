import React, { useEffect } from "react";
interface props {
  children: any;
  setIsDropDown: any;
  isDropDown: boolean;
}
export const DropDown = ({ children, setIsDropDown, isDropDown }) => {
  return (
    <>
      {isDropDown && (
        <div className="absolute top-20 left-0 w-1/4 h-44 bg-white z-50 border border-red-600">
          {children}
        </div>
      )}
    </>
  );
};
