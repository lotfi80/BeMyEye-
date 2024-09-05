
import React from 'react';
import ContainerSearch from '../container-searchbar/containerSearch';
import GridContainer from './gridContainer';

const Container: React.FC = () => {
  // return (
  //   <div className="w-full h-screen flex flex-col">
  //      <ContainerSearch />
        
  //       <GridContainer />
  //     </div>
  // );
  return (
    <div className="w-full flex flex-col h-full">
      {/* Search Section */}
      <ContainerSearch />

      {/* Grid Section */}
      <div className="flex-grow overflow-y-auto">
        <GridContainer />
      </div>
    </div>
  );
};


export default Container;
