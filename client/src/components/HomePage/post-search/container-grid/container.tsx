
import React from 'react';
import ContainerSearch from '../container-searchbar/containerSearch';
import GridContainer from './gridContainer';

const Container: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col">
       <ContainerSearch />
        
        <GridContainer />
      </div>
  );
};

export default Container;
