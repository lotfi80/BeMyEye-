import React from "react";
import  { useState } from "react";

import { useCategoryUserContext } from "../../../../context/CategoryUser";

const DistanceList: React.FC = () => {
  const { selectedDistance, setSelectedDistance } = useCategoryUserContext();

 
  return (
    <div className="flex flex-row flex-wrap gap-4 h-full w-[70%] ">
     
      <button
  onClick={() => setSelectedDistance(5)}
  className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
    selectedDistance === 5 ? 'bg-black text-white' : 'bg-gray-200 hover:bg-black hover:text-white'
  }`}
>
  Mehr als 5 km
</button>
      <button
        onClick={() => setSelectedDistance(10)}
        className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
          selectedDistance === 10 ? 'bg-black text-white' : 'bg-gray-200 hover:bg-black hover:text-white'
        }`}      >
        Mehr als 10 km
      </button>
      <button
        onClick={() => setSelectedDistance(20)}
        className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
          selectedDistance === 20 ? 'bg-black text-white' : 'bg-gray-200 hover:bg-black hover:text-white'
        }`}      >
        Mehr als 20 km
      </button>
    </div>
  );
};

export default DistanceList;

