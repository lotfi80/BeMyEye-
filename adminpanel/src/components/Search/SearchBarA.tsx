import React from 'react';
import { Input, Label, Icon, Button } from '@adminjs/design-system';
import { useNavigate } from 'react-router-dom';

interface props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValues: string;
  setInputValues: React.Dispatch<string>;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const SearchBar: React.FC<props> = ({ onChange, inputValues, setInputValues, onClick }) => {
  return (
    <>
      <Icon icon="Search" size={22} rounded onClick={onClick} />

      <Input
        type="text"
        variant="sm"
        width={200}
        placeholder="Search user by username..."
        value={inputValues}
        onChange={onChange}
      />
      <Icon
        icon="X"
        size={22}
        onClick={(e) => {
          e.preventDefault();
          setInputValues('');
        }}
      />
    </>
  );
};
export default SearchBar;
