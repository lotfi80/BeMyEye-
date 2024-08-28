import React from "react";
function SearchBar() {
  return (
    <div className="w-[30%]  p-2 border border-gray-300 rounded">
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border border-gray-300 rounded"
      />
    </div>
  );
}

export default SearchBar;
