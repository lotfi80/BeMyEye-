import React from "react";
// import { dataFetcher } from "../../assets/domain/apiClient";
import { useState, useRef } from "react";
import { DropDown } from "./DropDown";
// import { DisplayOfSearchingByName } from "../../assets/utils/DisplayOfSearchingByName";
import SearchBar from "./SearchBar";
import { getUserDataByID } from "../../http/api";
import { IUser } from "../../interfaces/User.js";
import GetMyPosts from "./GetMyPosts";

export const Input_DropDown = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [searchResults, setSearchResults] = useState<IUser | any>();
  const dropdownRef = useRef(null);

  const handleOnChange = async (event) => {
    if (event.target.value.length > 0)
      setIsDropDown((prev) => {
        return true;
      });
    else
      setIsDropDown((prev) => {
        return false;
      });

    const data = await getUserDataByID(event.target.value);
    if (data) setSearchResults(data);
  };

  return (
    <>
      <SearchBar onChange={handleOnChange} />
      <DropDown
        children={searchResults}
        isDropDown={isDropDown}
        setIsDropDown={setIsDropDown}
        classes="dropdown"
        dropdownRef={dropdownRef}
      >
        {/* <DisplayOfSearchingByName searchResults={searchResults} /> */}
      </DropDown>
    </>
  );
};
// import { SmallTVCard } from "../../components/SmallTVCard/SmallTVCard.jsx";

export const DisplayOfSearchingByName = ({ searchResults }) => {
  return searchResults?.results?.map((item) => {
    return <GetMyPosts />;
  });
};
