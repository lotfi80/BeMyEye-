import React from "react";

interface props {
  children: any[];
  setIsDropDown: any;
  isDropDown: boolean;
  setInputValues: any;
  width: string;
}
export const DropDown: React.FC<props> = ({
  children,
  setIsDropDown,
  isDropDown,
  setInputValues,
  width,
}) => {
  const handleOnClick = (child: any) => {
    setInputValues(child?.value);
    setIsDropDown(false);
  };

  return (
    <>
      {isDropDown && (
        <>
          <div
            className="searchBarDropdown
           z-50 flex flex-col"
          >
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
