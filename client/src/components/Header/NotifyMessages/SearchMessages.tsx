import React, { useEffect } from "react";
import { useState } from "react";
import { DropDown } from "../../searchBar/DropDown";
import SearchBar from "../../searchBar/SearchBar";
import IUser from "../../../interfaces/User";
import IMessage from "../../../interfaces/Message";

interface props {
  inbox: IMessage[] | null;
  setIsSearchActive: any;
  isSearchActive: boolean;
  setWriteInSearchBarResults: any;
  writeInSearchBarResults: any[];
  setSearchResults: any;
}

const SearchMessages: React.FC<props> = ({
  inbox,
  setIsSearchActive,
  isSearchActive,
  setWriteInSearchBarResults,
  writeInSearchBarResults,
  setSearchResults,
}) => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<string>("");

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setWriteInSearchBarResults([]);
    setInputValues(event.target.value);
    if (event.target.value.length > 0) {
      setIsDropDown(true);

      if (inbox && inbox.length > 0) {
        const results = inbox
          .map((msg: IMessage) => {
            if (
              msg.sender.username
                ?.toLowerCase()
                .startsWith(event.target.value.toLocaleLowerCase())
            ) {
              return { field: "username", value: msg.sender.username };
            }
            if (msg.createdAt.toString().startsWith(event.target.value)) {
              return { field: "createdAt", value: msg.createdAt };
            }
            if (
              msg.subject
                ?.toLowerCase()
                .startsWith(event.target.value.toLocaleLowerCase())
            ) {
              return { field: "subject", value: msg.subject };
            }
            if (
              msg.message
                ?.toLowerCase()
                .startsWith(event.target.value.toLocaleLowerCase())
            ) {
              return { field: "message", value: msg.message };
            }
            return null;
          })
          .filter((result) => result !== null);
        console.log("result", results);

        for (let i = 0; i < results.length; i++) {
          for (let j = i + 1; j < results.length; j++) {
            if (results[i].value === results[j].value) {
              results.splice(j, 1);
              j--;
            }
          }
        }
        console.log("results:", results);
        setWriteInSearchBarResults(results);
      }
    } else setIsDropDown(false);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" || inputValues.length === 0) {
      setIsSearchActive(false);
      setIsDropDown(false);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    console.log("searching...", isSearchActive);
    if (!inbox) return;
    const searchResult: Partial<IMessage>[] = inbox.filter((msg: IMessage) => {
      return (
        msg.sender?.username
          ?.toLowerCase()
          .startsWith(inputValues.toLowerCase()) ||
        msg.createdAt?.toString().startsWith(inputValues) ||
        msg.subject?.toLowerCase().startsWith(inputValues.toLowerCase()) ||
        (inputValues.length > 7 &&
          msg.message?.toLowerCase().includes(inputValues.toLowerCase()))
      );
    });
    console.log("last", searchResult);
    setSearchResults(searchResult);
  }, [isSearchActive]);

  return (
    <>
      <SearchBar
        onChange={handleOnChange}
        inputValues={inputValues}
        setInputValues={setInputValues}
        setIsSearchActive={setIsSearchActive}
        setIsDropDown={setIsDropDown}
        onKeyDown={handleOnKeyDown}
      />

      <DropDown
        children={writeInSearchBarResults}
        isDropDown={isDropDown}
        setIsDropDown={setIsDropDown}
        setInputValues={setInputValues}
        width={"50%"}
      ></DropDown>
    </>
  );
};
export default SearchMessages;
