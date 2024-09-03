import React from "react";

interface DistanceListProps {
  onDistanceSelect: (distance: number) => void;
}

const DistanceList: React.FC<DistanceListProps> = ({ onDistanceSelect }) => {
  const distances = [5, 10, 20, 50]; 

  return (
    <div>
      <h4>Select a distance</h4>
      <ul>
        {distances.map((distance, index) => (
          <li
            key={index}
            onClick={() => onDistanceSelect(distance)}
            className="cursor-pointer p-2 hover:bg-gray-200"
          >
            {distance} km
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DistanceList;
