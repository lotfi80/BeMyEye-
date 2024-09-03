// import React from "react";
// function DistanceList() {
//   return (
//     <div className="flex flex-row flex-wrap gap-4 h-full w-[70%] ">
//       <div className="bg-gray-200 px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer transition-colors">
//         Mehr als 5 km
//       </div>
//       <div className="bg-gray-200 px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer transition-colors">
//         Mehr als 10 km
//       </div>
//       <div className="bg-gray-200 px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer transition-colors">
//         Mehr als 20 km
//       </div>
//     </div>
//   );
// }

// export default DistanceList;


import React from "react";
import { useCategoryUserContext } from "../../../../context/CategoryUser";






const DistanceList: React.FC = () => {
  const { selectedDistance, setSelectedDistance } = useCategoryUserContext();

  return (
    <div className="flex flex-row flex-wrap gap-4 h-full w-[70%] ">
      <button
        onClick={() => setSelectedDistance(5)}
        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer transition-colors"
      >
        Mehr als 5 km
      </button>
      <button
        onClick={() => setSelectedDistance(10)}
        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer transition-colors"
      >
        Mehr als 10 km
      </button>
      <button
        onClick={() => setSelectedDistance(20)}
        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer transition-colors"
      >
        Mehr als 20 km
      </button>
    </div>
  );
};

export default DistanceList;

