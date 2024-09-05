import React, { useEffect } from "react";
import { useState } from "react";
import { DropDown } from "./DropDown.js";
import SearchBar from "./SearchBar.js";
import { getUsers } from "../../http/api.js";
import { IUser } from "../../interfaces/User.js";
import GetMyPosts from "../Header/AccountButton/GetMyPosts.js";

export const Search = () => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<string | any>([]);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [inputValues, setInputValues] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getUsers();
        setAllUsers(allUsers);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsers();
  }, []);

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchResults([]);
    setInputValues(event.target.value);
    if (event.target.value.length > 0) {
      setIsDropDown(true);
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
        setSearchResults(results);
      }
    } else setIsDropDown(false);
  };

  return (
    <>
      <SearchBar
        onChange={handleOnChange}
        inputValues={inputValues}
        setInputValues={setInputValues}
      />
      <DropDown
        children={searchResults}
        isDropDown={isDropDown}
        setIsDropDown={setIsDropDown}
        setInputValues={setInputValues}
      ></DropDown>
    </>
  );
};

// export const DisplayOfSearchingByName = ({ searchResults }) => {
//   return searchResults?.results?.map((item) => {
//     return <GetMyPosts />;
//   });
// };
