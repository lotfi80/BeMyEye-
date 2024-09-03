import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="w-[30%] p-2 border border-gray-300 rounded">
      <input
        type="text"
        placeholder="Enter city..."
        value={searchTerm}
        onChange={handleInputChange}
        onBlur={handleSearch} // Ruft die Filterung auf, wenn der Benutzer die Eingabe beendet.
        className="p-2 border border-gray-300 rounded w-full"
      />
      <button> search </button>
    </div>
  );
};

export default SearchBar;
