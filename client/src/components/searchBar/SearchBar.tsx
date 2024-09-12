import React from "react";

interface props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  inputValues: string;
  setInputValues: React.Dispatch<string>;
  setIsSearchActive: React.Dispatch<boolean>;
  setIsDropDown: React.Dispatch<boolean>;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<props> = ({
  onChange,
  inputValues,
  setInputValues,
  setIsSearchActive,
  setIsDropDown,
  onKeyDown,
}) => {
  return (
    <div className="absolute left-5 top-3" style={{ width: "30%" }}>
      <form className="form relative ">
        <button
          className="absolute left-5 -translate-y-1/3 top-1/2 pl-5 "
          onClick={(e) => {
            e.preventDefault();
            setIsSearchActive(true);
            setIsDropDown(false);
          }}
        >
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
            className="w-5 h-5 text-gray-700"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth={1.333}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          className="rounded-2 pl-5  border-2 border-transparent ml-10
          focus:outline-none focus:border-blue-500
           placeholder-gray-400 transition-all duration-300 shadow-md "
          style={{ width: "100%" }}
          placeholder="Search..."
          required
          type="text"
          value={inputValues}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button
          type="reset"
          className="absolute left-full -translate-y-1/2 top-1/2 p-1"
          onClick={(e) => {
            e.preventDefault();
            setInputValues("");
            setIsSearchActive(false);
            setIsDropDown(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
