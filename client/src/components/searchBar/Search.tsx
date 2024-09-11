import React, { useEffect } from "react";
import { useState } from "react";
import { DropDown } from "./DropDown";
import SearchBar from "./SearchBar";
import IUser from "../../interfaces/User";

interface props {
  setIsSearchActive?: any;
  isSearchActive?: boolean;
  allUsers: IUser[];
  setWriteInSearchBarResults: any;
  writeInSearchBarResults: any;
  setSearchResults: any;
  postVisible?: boolean;
}

export const Search: React.FC<props> = ({
  setIsSearchActive,
  isSearchActive,
  setWriteInSearchBarResults,
  writeInSearchBarResults,
  allUsers,
  setSearchResults,
  postVisible,
}) => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<string>("");

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setWriteInSearchBarResults([]);
    setInputValues(event.target.value);
    if (event.target.value.length > 0) {
      setIsDropDown(true);
      // /////////////////////////////////////
      ///////////////////////////////////////
      //////////////////////////////////////
      /////////////////////////////////////
      if (allUsers && allUsers.length > 0) {
        const results = allUsers
          .map((user: IUser) => {
            if (
              user.username
                ?.toLowerCase()
                .startsWith(event.target.value.toLocaleLowerCase())
            ) {
              return { field: "username", value: user.username };
            }
            if (
              user.firstname
                ?.toLowerCase()
                .startsWith(event.target.value.toLocaleLowerCase())
            ) {
              return { field: "firstname", value: user.firstname };
            }
            if (
              user.lastname
                ?.toLowerCase()
                .startsWith(event.target.value.toLocaleLowerCase())
            ) {
              return { field: "lastname", value: user.lastname };
            }
            if (
              user.city
                ?.toLowerCase()
                .startsWith(event.target.value.toLocaleLowerCase())
            ) {
              return { field: "city", value: user.city };
            }
            return null;
          })
          .filter((result) => result !== null);

        for (let i = 0; i < results.length; i++) {
          for (let j = i + 1; j < results.length; j++) {
            if (results[i].value === results[j].value) {
              results.splice(j, 1);
              j--;
            }
          }
        }
        setWriteInSearchBarResults(results);
      }
    } else setIsDropDown(false);
  };

  useEffect(() => {
    const searchResult: Partial<IUser>[] = allUsers.filter((user: IUser) => {
      return (
        user.username?.toLowerCase().startsWith(inputValues.toLowerCase()) ||
        user.firstname?.toLowerCase().startsWith(inputValues.toLowerCase()) ||
        user.lastname?.toLowerCase().startsWith(inputValues.toLowerCase()) ||
        user.city?.toLowerCase().startsWith(inputValues.toLowerCase())
      );
    });
    setSearchResults(searchResult);
  }, [isSearchActive]);

  return (
    <>
      {postVisible || (
        <SearchBar
          onChange={handleOnChange}
          inputValues={inputValues}
          setInputValues={setInputValues}
          setIsSearchActive={setIsSearchActive}
          setIsDropDown={setIsDropDown}
        />
      )}
      <DropDown
        children={writeInSearchBarResults}
        isDropDown={isDropDown}
        setIsDropDown={setIsDropDown}
        setInputValues={setInputValues}
        width={"25%"}
      />
    </>
  );
};
