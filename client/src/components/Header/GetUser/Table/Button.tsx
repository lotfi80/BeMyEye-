import React from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <div
      className="py-2 
    text-gray-600 hover:text-green-600 font-bold  align-middle
     border-2  border-green-600 rounded"
    >
      <button onClick={onClick}>{text}</button>
    </div>
  );
};
