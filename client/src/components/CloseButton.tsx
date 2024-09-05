import React from "react";

type CloseButtonProps = {
  setFunction: () => void;
};

const closeButton: React.FC<CloseButtonProps> = ({ setFunction }) => {
  const handleClose = () => {
    setFunction();
  };
  return (
    <>
      <div
        className={`
       cursor-pointer
        absolute top-5 right-5
        z-10
      `}
        onClick={() => {
          handleClose();
        }}
      >
        <img src="/xmark-solid.svg" alt="close" />
      </div>
    </>
  );
};
export default closeButton;
