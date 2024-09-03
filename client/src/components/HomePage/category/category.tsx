// Category.tsx
// Category.tsx
// components/container-searchbar/containerSearch.tsx
import React from 'react';
import { useCategoryUserContext } from '../../../context/CategoryUser';
import CategoryList from './categoryList';
// import { Categories } from '../../../types/types';

const ContainerSearch: React.FC = () => {
  // const { selectedCategory } = useCategoryUserContext();

  return (
    <div>
      {/* <p>Selected Category: {selectedCategory}</p> */}
      <CategoryList />
      {/* Hier kannst du basierend auf selectedCategory Filter-Logik implementieren */}

    </div>
  );
};

export default ContainerSearch;

