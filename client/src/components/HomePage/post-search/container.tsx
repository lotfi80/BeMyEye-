import React from "react";
import ContainerSearch from "./container-searchbar/containerSearch";
import GridContainer from "./container-grid/gridContainer";
function Container() {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-[20%] bg-gray-100 p-4 overflow-auto border border-spacing-1">
        <ContainerSearch />
      </div>
      <div className="w-full h-[80%]  border-black p-4 overflow-auto border border-spacing-2">
        <GridContainer />
      </div>
    </div>
  );
}

export default Container;
