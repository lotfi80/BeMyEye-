import React, { useEffect } from "react";
import Blind from "../Blind";
import { IUser } from "../../interfaces/User";

interface props {
  children: any[];
  setIsDropDown: any;
  isDropDown: boolean;
  setInputValues: any;
}
export const DropDown: React.FC<props> = ({
  children,
  setIsDropDown,
  isDropDown,
  setInputValues,
}) => {
  const handleOnClick = (child: any) => {
    setInputValues(child?.value);
    setIsDropDown(false);
  };

  return (
    <>
      {isDropDown && (
        <>
          <div className="absolute top-15 left-5 w-1/4 h-auto bg-gray-100 z-50 flex flex-col pl-8 pb-8 pt-2">
            {children.map((child, index) => (
              <div key={index} onClick={() => handleOnClick(child)}>
                {`${child?.value}`}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
