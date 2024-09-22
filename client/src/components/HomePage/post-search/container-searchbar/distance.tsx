import React, { useState } from "react";
import { useCategoryUserContext } from "../../../../context/CategoryUser";

const DistanceList: React.FC = () => {
  const { selectedDistance, setSelectedDistance } = useCategoryUserContext();
  const [distance, setDistance] = useState<number>(selectedDistance ?? 10); // Initialwert auf 5 setzen

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setDistance(value);
    setSelectedDistance(value);
  };

  return (


<div className="flex flex-col items-center gap-4 h-full w-full p-4">
<label htmlFor="distance-slider" className="text-lg font-medium mb-2">
  Distanz: <span className="text-orange-700">{distance}</span> km
</label>
<div className="relative w-3/4 md:w-1/2 lg:w-2/3">
  <input
    id="distance-slider"
    type="range"
    min="10"
    max="50"
    step="10"
    value={distance}
    onChange={handleSliderChange}
    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer shadow-md"
    style={{
      background: `linear-gradient(to right, #2781b5 ${((distance - 10) / 40) * 100}%, #e2e8f0 ${((distance - 10) / 40) * 100}%)`,
    }}
  />
  <div
  className="absolute bg-[#214256] -bottom-2.5 -left-5 transform -translate-y-2 -translate-x-2 w-10 h-7 rounded-full shadow-xl "
  style={{ left: `calc(${((distance - 10) / 40) * 100}% - 2px)` }}
/>

  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 text-xs rounded p-1 shadow-md">
    {distance} km
  </span>
</div>
<div className="flex justify-between w-3/4 md:w-1/2 lg:w-2/3 text-sm text-gray-700 mt-2">
  <span>10 km</span>
  <span>20 km</span>
  <span>30 km</span>
  <span>40 km</span>
  <span>50 km</span>
</div>
</div>


  );
};

export default DistanceList;
