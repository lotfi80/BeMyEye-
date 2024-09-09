// import React from "react";
// import  { useState } from "react";

// import { useCategoryUserContext } from "../../../../context/CategoryUser";

// const DistanceList: React.FC = () => {
//   const { selectedDistance, setSelectedDistance } = useCategoryUserContext();

 
//   return (
//     <div className="flex flex-row flex-wrap gap-4 h-full w-[70%] ">
     
//       <button
//   onClick={() => setSelectedDistance(5)}
//   className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
//     selectedDistance === 5 ? 'bg-black text-white' : 'bg-gray-200 hover:bg-black hover:text-white'
//   }`}
// >
//   Mehr als 5 km
// </button>
//       <button
//         onClick={() => setSelectedDistance(10)}
//         className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
//           selectedDistance === 10 ? 'bg-black text-white' : 'bg-gray-200 hover:bg-black hover:text-white'
//         }`}      >
//         Mehr als 10 km
//       </button>
//       <button
//         onClick={() => setSelectedDistance(20)}
//         className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
//           selectedDistance === 20 ? 'bg-black text-white' : 'bg-gray-200 hover:bg-black hover:text-white'
//         }`}      >
//         Mehr als 20 km
//       </button>
//     </div>
//   );
// };

// export default DistanceList;



import React, { useState } from "react";
import { useCategoryUserContext } from "../../../../context/CategoryUser";

const DistanceList: React.FC = () => {
  const { selectedDistance, setSelectedDistance } = useCategoryUserContext();
  const [distance, setDistance] = useState<number>(selectedDistance ?? 5); // Initialwert auf 5 setzen

  // Slider-Wert ändern
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setDistance(value);
    setSelectedDistance(value);
  };

  return (
    <div className="flex flex-col items-center gap-4 h-full w-full p-4">
      <label htmlFor="distance-slider" className="text-lg font-medium mb-2">
        Distanz: {distance} km
      </label>
      <div className=" w-3/4 md:w-1/2 lg:w-2/3">
        <input
          id="distance-slider"
          type="range"
          min="5"
          max="20"
          step="5"
          value={distance}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer shadow-md"
          style={{
            background: `linear-gradient(to right, #4f6d7a ${((distance - 5) / 15) * 100}%, #e2e8f0 ${((distance - 5) / 15) * 100}%)`,
          }}
        />
        {/* Custom slider thumb */}
        <div
          className="absolute -top-2 transform -translate-y-1/2 bg-blue-500 w-6 h-6 rounded-full shadow-md"
          style={{ left: `calc(${((distance - 5) / 15) * 100}% - 12px)` }}
        />
      </div>
      <div className="flex justify-between w-3/4 md:w-1/2 lg:w-2/3 text-sm text-gray-600 mt-2">
        <span>5 km</span>
        <span>10 km</span>
        <span>15 km</span>
        <span>20 km</span>
      </div>
    </div>
  );
};

export default DistanceList;



