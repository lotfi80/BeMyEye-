import React, { useState } from "react";
import { Popover, PopoverBackdrop, PopoverPanel } from "@headlessui/react";
interface HamburgerProps {
  mobileMenuOpen: boolean;
}
const Hamburger: React.FC<HamburgerProps> = ({ mobileMenuOpen }) => {
  return (
    <>
      {mobileMenuOpen && (
        <>
          {" "}
          <Popover>
            <PopoverBackdrop className="popover-backdrop" />
            <PopoverPanel
              transition
              className="popover-panel
                           transition data-[closed]:translate-y-1
                           data-[closed]:opacity-0 data-[enter]:duration-200
                            data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              fff
            </PopoverPanel>
          </Popover>
        </>
      )}
    </>
  );
};
export default Hamburger;
