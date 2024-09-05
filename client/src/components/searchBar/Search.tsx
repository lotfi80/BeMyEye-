import React from "react";
import { useState } from "react";
import { DropDown } from "./DropDown.js";
import SearchBar from "./SearchBar.js";
import { getUserDataByID } from "../../http/api.js";
import { IUser } from "../../interfaces/User.js";
import GetMyPosts from "../Header/AccountButton/GetMyPosts.js";

export const Search = () => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<IUser | any>();

  const handleOnChange = async (event) => {
    if (event.target.value.length > 0) setIsDropDown(true);
    else setIsDropDown(false);

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
      >
        {/* <DisplayOfSearchingByName searchResults={searchResults} /> */}
      </DropDown>
    </>
  );
};

export const DisplayOfSearchingByName = ({ searchResults }) => {
  return searchResults?.results?.map((item) => {
    return <GetMyPosts />;
  });
};
