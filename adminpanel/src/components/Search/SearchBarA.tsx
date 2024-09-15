import React from 'react';
import { Input, Label, Icon, Button } from '@adminjs/design-system';

interface props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValues: string;
  setInputValues: React.Dispatch<string>;
  setIsSearchActive: React.Dispatch<boolean>;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<props> = ({ onChange, inputValues, setIsSearchActive, onKeyDown, setInputValues }) => {
  return (
    <>
      <Icon
        icon="Search"
        size={22}
        rounded
        onClick={(e) => {
          e.preventDefault();
          setIsSearchActive(true);
        }}
      />

      <Input
        type="text"
        variant="sm"
        width={200}
        placeholder="Search user by username..."
        value={inputValues}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <Icon
        icon="X"
        size={22}
        onClick={(e) => {
          e.preventDefault();
          setInputValues('');
          setIsSearchActive(false);
        }}
      />
    </>
  );
};
export default SearchBar;
