// container.tsx
// container.tsx
// components/container/container.tsx
import React from "react";
import ContainerSearch from "../container-searchbar/containerSearch";
import GridContainer from "./gridContainer";
// import CategoryList from '../../category/categoryList';

const Container: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <ContainerSearch />

      <GridContainer />
    </div>
  );
};

export default Container;
