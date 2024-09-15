import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, DropDown, DropDownItem, DropDownMenu, DropDownTrigger, Icon } from '@adminjs/design-system';
import SearchBarA from './SearchBarA.js';
import { IUser } from '../../models/user.js';
import { getUsers } from '../../http/api.js';

const MyDropDown: React.FC = () => {
  const [inputValues, setInputValues] = useState<string>('');

  const [writeInSearchBarResults, setWriteInSearchBarResults] = useState<any>([]);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await getUsers();
        setAllUsers(response);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  const handleOnClick = (child: any) => {
    setInputValues(child?.value);
  };

  const handleSearchClick = () => {
    const searchResult: Partial<IUser>[] = allUsers.filter((user: IUser) => {
      return (
        user.username?.toLowerCase().startsWith(inputValues.toLowerCase()) ||
        user.firstname?.toLowerCase().startsWith(inputValues.toLowerCase()) ||
        user.lastname?.toLowerCase().startsWith(inputValues.toLowerCase()) ||
        user.city?.toLowerCase().startsWith(inputValues.toLowerCase())
      );
    });
    const resultsUsernames = searchResult.map((result) => result.username);
    const queryParam = resultsUsernames.map((username) => `filters.username=${encodeURIComponent(username)}`).join('&');
    navigate(`/admin/resources/User?${queryParam}`);
  };

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setWriteInSearchBarResults([]);

    setInputValues(event.target.value);
    if (event.target.value.length > 0) {
      if (allUsers && allUsers.length > 0) {
        const results = allUsers
          .map((user: IUser) => {
            if (user.username?.toLowerCase().startsWith(event.target.value.toLocaleLowerCase())) {
              return { field: 'username', value: user.username };
            }
            if (user.firstname?.toLowerCase().startsWith(event.target.value.toLocaleLowerCase())) {
              return { field: 'firstname', value: user.firstname };
            }
            if (user.lastname?.toLowerCase().startsWith(event.target.value.toLocaleLowerCase())) {
              return { field: 'lastname', value: user.lastname };
            }
            if (user.city?.toLowerCase().startsWith(event.target.value.toLocaleLowerCase())) {
              return { field: 'city', value: user.city };
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
    }
  };

  return (
    <>
      <Box border="1px solid red">
        <DropDown stick="left">
          <DropDownTrigger>
            <Button>
              <SearchBarA
                onChange={handleOnChange}
                onClick={handleSearchClick}
                inputValues={inputValues}
                setInputValues={setInputValues}
              />
            </Button>
          </DropDownTrigger>
          <DropDownMenu width={1}>
            {writeInSearchBarResults.map((child: any, index: number) => (
              <DropDownItem key={index} onClick={() => handleOnClick(child)}>
                {`${child?.value}`}
              </DropDownItem>
            ))}
          </DropDownMenu>
        </DropDown>
      </Box>
    </>
  );
};
export default MyDropDown;
