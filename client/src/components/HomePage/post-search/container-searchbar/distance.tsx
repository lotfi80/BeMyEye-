import React from "react";
function DistanceList() {
  return (
    <div className="flex flex-row flex-wrap gap-4 h-full w-[70%] ">
      <div className="bg-gray-200 px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer transition-colors">
        Mehr als 5 km
      </div>
      <div className="bg-gray-200 px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer transition-colors">
        Mehr als 10 km
      </div>
      <div className="bg-gray-200 px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer transition-colors">
        Mehr als 20 km
      </div>
      {/* Weitere Listeneinträge können hier hinzugefügt werden */}
    </div>
  );
}

export default DistanceList;
