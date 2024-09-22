import React, { useState, useEffect } from "react";

interface BurgerProps {
  handleOnBurgerClick: React.ChangeEventHandler<HTMLInputElement>;
  isOpen?: boolean;
}
const Burger: React.FC<BurgerProps> = ({ handleOnBurgerClick, isOpen }) => {
  return (
    <label className="popup">
      <input
        type="checkbox"
        checked={isOpen}
        onChange={(e) => {
          handleOnBurgerClick(e);
        }}
      />

      <div className="burger" tabIndex={0}>
        <span />
        <span />
        <span />
      </div>
    </label>
  );
};

export default Burger;
