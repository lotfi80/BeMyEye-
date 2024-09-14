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
            className="absolute top-15 left-5
          h-auto bg-gray-100 z-50 flex flex-col pl-8 pb-8 pt-2"
            style={{ width: width }}
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
