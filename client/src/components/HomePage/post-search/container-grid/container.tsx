// container.tsx
// container.tsx
// components/container/container.tsx
import React from 'react';
import ContainerSearch from '../container-searchbar/containerSearch';
import GridContainer from './gridContainer';
// import CategoryList from '../../category/categoryList';

const Container: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* <div className="w-full h-[20%] bg-gray-100 p-4 overflow-auto border border-black">
        <CategoryList />
      </div> */}
      <ContainerSearch />
      {/* <div className="w-full h-[80%] p-4 overflow-auto border border-black"> */}
        
        <GridContainer />
      </div>
    // </div>
  );
};

export default Container;

;



